import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';

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
    try {
      const ipc = require('ipc');
      ipc.send('logout');
    } catch (error) {
      console.log('remove cookie event error:', error);
    }

    return {
      ...state,
      user: initialState.user,
    };
  },
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    logged: false,
  }),
  [LOGIN_SUCCESS]: (state, action) => {
    const data = action.payload;

    if (data !== null) {
      return {
        ...state,
        user: {
          id: data.uid,
          name: data.name,
          token: data.ck,
        },
        logged: true,
      };
    }

    return {
      ...state,
      logged: false
    };
  },
  [VERIFY_SUCCESS]: (state) => state,
  [VERIFY_FAILURE]: (state) => ({
    ...state,
    user: initialState.user,
  })
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

  const loginFailed = (error) => {
    return {
      type: LOGIN_FAILURE,
      error
    };
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
            payload: (action, state, response) => {
              return response.json().then(json => {
                if (json.err_msg) {
                  dispatch(loginFailed(json.err_msg));
                  return null;
                }
                return json.user_info;
              });
            },
          },
          LOGIN_FAILURE
        ]
      }
    });
  };
}

export function verify() {
  const verifyFailed = () => {
    return {
      type: VERIFY_FAILURE,
    };
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
            payload: (action, state, response) => {
              return response.json().then(json => {
                if (json.msg) {
                  dispatch(verifyFailed(json.err_msg));
                }
                return;
              });
            },
          },
          VERIFY_FAILURE,
        ]
      }
    });
  };
}
