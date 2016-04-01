import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import _ from 'ramda';
import { transform } from '../utils/user';

export const VERIFY_REQUEST = 'AUTH/VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'AUTH/VERIFY_SUCCESS';
export const VERIFY_FAILURE = 'AUTH/VERIFY_FAILURE';
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAIL';
export const LOGOUT = 'AUTH/LOGOUT';

const initialState = Immutable({
  user: {
    id: 0,
    token: ''
  }
});

export default handleActions({
  [LOGOUT]: (state) => {
    _.tryCatch(() => require('ipc').send('logout'), _.F)();
    return { ...state, user: initialState.user };
  },

  [LOGIN_REQUEST]: (state) => ({ ...state, logged: false, }),

  [LOGIN_SUCCESS]: (state, action) => {
    const data = action.payload;
    return { ...state, user: transform(data), logged: _.is(Object, data) };
  },

  [VERIFY_SUCCESS]: (state) => state,

  [VERIFY_FAILURE]: (state) => ({ ...state, user: initialState.user, })
}, initialState);

export function logout() {
  return {
    type: LOGOUT
  };
}

export function login(data) {
  const defaultParams = {
    source: 'radio',
    task: 'sync_channel_list',
  };

  const loginFailed = _.curry((dispatch, error) => {
    dispatch({ type: LOGIN_FAILURE, error });
    return null;
  });

  const responseHandle = (dispatch, response) => {
    return _.ifElse(
      _.has('err_msg'),
      _.compose(loginFailed(dispatch), _.prop('err_msg')),
      _.prop('user_info')
    )(response);
  };

  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: 'http://douban.fm/j/login',
        method: 'POST',
        body: {
          ...defaultParams,
          ...data
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        types: [
          LOGIN_REQUEST,
          {
            type: LOGIN_SUCCESS,
            payload: (action, state, response) => response
              .json()
              .then(json => responseHandle(dispatch, json)),
          },
          LOGIN_FAILURE
        ]
      }
    });
  };
}

export function verify() {
  const verifyFailed = (dispatch, error) => {
    return _.ifElse(
      _.isNil,
      _.T,
      _.compose(dispatch, _.always({ type: VERIFY_FAILURE })),
    )(error);
  };

  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: 'http://douban.fm/j/v2/user_info',
        method: 'GET',
        credentials: 'include',
        types: [
          VERIFY_REQUEST,
          {
            type: VERIFY_SUCCESS,
            payload: (action, state, response) => response
              .json()
              .then(json => verifyFailed(dispatch, _.prop('msg', json)))
          },
          VERIFY_FAILURE,
        ]
      }
    });
  };
}
