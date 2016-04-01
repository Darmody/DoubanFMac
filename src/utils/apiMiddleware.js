import { CALL_API } from 'redux-api-middleware';
import _ from 'ramda';
import {
  FETCH_ALL_REQUEST, FETCH_ALL_SUCCESS, FETCH_ALL_FAILURE
} from '../actionTypes/favorite';
import config from '../../config';

function fetch(actionTypes, channel, lastSongId = 0, type = 's') {
  const params = {
    channel,
    bps: 192,
    client: 's:mainsite|y:3.0',
    pb: 128,
    'app_name': 'radio_website',
    version: 100,
    sid: lastSongId,
    type,
  };
  const queryString = _.compose(
    _.join('&'), _.map(_.join('=')), _.toPairs,
    _.mapObjIndexed((value) => encodeURIComponent(value))
  )(params);

  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: `http://douban.fm/j/v2/playlist?${queryString}`,
        method: 'GET',
        credentials: 'include',
        types: actionTypes(dispatch),
      }
    });
  };
}

function fetchFavorite(ids) {
  const localStorage = window.localStorage;
  const authKey = config.persistAuthKey;
  const token = _.compose(
    _.pathOr('', ['auth', 'user', 'token']), JSON.parse, _.propOr('{}', authKey),
  )(localStorage);
  const body = { bps: 192, sids: _.join('|', ids), ck: token };
  return {
    [CALL_API]: {
      endpoint: 'http://douban.fm/j/v2/redheart/songs',
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      types: [
        FETCH_ALL_REQUEST,
        FETCH_ALL_SUCCESS,
        FETCH_ALL_FAILURE
      ]
    }
  };
}

export default {
  fetch,
  fetchFavorite,
};
