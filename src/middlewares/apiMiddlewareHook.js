import { compose } from 'redux';
import { CALL_API, isValidRSAA } from 'redux-api-middleware';
import { decamelizeKeys } from 'humps';
import _ from 'ramda';
import {
  FETCH_REQUEST as CHANNEL_FETCH_REQUEST,
  BAN_REQUEST as CHANNEL_BAN_REQUEST,
  REFUSE as CHANNEL_REFUSE,
} from '../actionTypes/channel';
import {
  BAN_REQUEST as FAVORITE_BAN_REQUEST,
  REFUSE as FAVORITE_REFUSE,
} from '../actionTypes/favorite';
import {
  BAN_REQUEST as DAILY_BAN_REQUEST,
  REFUSE as DAILY_REFUSE,
} from '../actionTypes/daily';

const decamelizeBody = (action) => {
  const callAPI = action[CALL_API];
  const { body } = callAPI;

  if (!body) return action;

  return {
    ...action,
    [CALL_API]: {
      ...callAPI,
      body: decamelizeKeys(body)
    }
  };
};

const serializeFormBody = (action) => {
  const callAPI = action[CALL_API];
  const { body, headers } = callAPI;

  if (!body || headers['Content-Type'] !== 'application/x-www-form-urlencoded') return action;

  const parsedBody = _.compose(
    _.join('&'), _.map(_.join('=')), _.toPairs,
    _.mapObjIndexed((value) => encodeURIComponent(value))
  )(body);
  return {
    ...action,
    [CALL_API]: {
      ...callAPI,
      body: parsedBody,
    }
  };
};

const stringifyJsonBody = (action) => {
  const callAPI = action[CALL_API];
  const { body } = callAPI;

  if (!body || !_.is(Object, body)) return action;

  return {
    ...action,
    [CALL_API]: {
      ...callAPI,
      body: JSON.stringify(body),
    }
  };
};

const pendingRefuse = (action, store) => {
  if (!store) return action;

  const callAPI = action[CALL_API];
  if (_.contains(callAPI.types[0], [CHANNEL_FETCH_REQUEST, CHANNEL_BAN_REQUEST])) {
    if (store.getState().channel.loading) return { type: CHANNEL_REFUSE };
  }
  if (FAVORITE_BAN_REQUEST === callAPI.types[0]) {
    if (store.getState().favorite.loading) return { type: FAVORITE_REFUSE };
  }
  if (DAILY_BAN_REQUEST === callAPI.types[0]) {
    if (store.getState().favorite.loading) return { type: DAILY_REFUSE };
  }

  return action;
};

export default store => next => action => {
  let newAction = action;

  if (isValidRSAA(action)) {
    newAction = pendingRefuse(action, store);
    if (!isValidRSAA(newAction)) return next(newAction);

    newAction = compose(
       pendingRefuse, stringifyJsonBody, serializeFormBody, decamelizeBody
    )(newAction);
  }

  return next(newAction);
};
