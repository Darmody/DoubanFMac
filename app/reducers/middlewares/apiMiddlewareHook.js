import { compose } from 'redux';
import { CALL_API, isValidRSAA } from 'redux-api-middleware';
import { decamelizeKeys } from 'humps';
import _transform from 'lodash.transform';
import _join from 'lodash.join';
import _isPlainObject from 'lodash.isPlainObject';

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

  if (!body || headers['Content-Type'] !== 'application/x-www-form-urlencoded') {
    return action;
  }

  /* eslint no-param-reassign: 0*/
  const fieldsArray = _transform(body, (result, value, key) => {
    result.push(`${key}=${value}`);
  }, []);

  return {
    ...action,
    [CALL_API]: {
      ...callAPI,
      body: _join(fieldsArray, '&'),
    }
  };
};

const strinifyJsonBody = (action) => {
  const callAPI = action[CALL_API];
  const { body } = callAPI;

  if (!body || !_isPlainObject(body)) return action;

  return {
    ...action,
    [CALL_API]: {
      ...callAPI,
      body: JSON.stringify(body),
    }
  };
};

export default () => next => action => {
  let newAction = action;

  if (isValidRSAA(action)) {
    newAction = compose(
       strinifyJsonBody, serializeFormBody, decamelizeBody,
    )(action);
  }

  return next(newAction);
};
