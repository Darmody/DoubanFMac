import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import config from '../../config';

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAIL';
export const LOGOUT = 'AUTH/LOGOUT';

const initialState = Immutable({
  user: {
    id: 0
  }
});

export default handleActions({
  [LOGOUT]: (state) => {
    try {
      const PersistStorage = require('electron-json-storage');
      PersistStorage.remove(config.electronStorageKey);
    } catch (error) {
      console.log('Electron Storage Error:', error);
    }

    return {
      ...state,
      user: {
        ...state.user,
        id: 0
      }
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
        },
        logged: true,
      };
    }

    return {
      ...state,
      logged: false
    };
  }
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
