import { CALL_API } from 'redux-api-middleware';

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAIL';

const initialState = {
  user: {
    id: 0,
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        logged: false,
      };
    case LOGIN_SUCCESS:
      const data = action.payload;

      if (data !== null) {
        return {
          ...state,
          user: {
            id: data.userId,
            name: data.userName,
            email: data.email,
            token: data.token,
            espire: data.expire,
          },
          logged: true,
        };
      }

      return {
        ...state,
        logged: false
      };
    default:
      return state;
  }
};

export function login(data) {
  const defaultParams = {
    app_name: 'radio_android',
    version: '100',
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
        endpoint: 'http://www.douban.com/j/app/login',
        method: 'POST',
        body: {
          ...defaultParams,
          ...data
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        types: [
          LOGIN_REQUEST,
          {
            type: LOGIN_SUCCESS,
            payload: (action, state, response) => {
              return response.json().then(json => {
                if (json.err !== 'ok') {
                  dispatch(loginFailed(json.err));
                  return null;
                }
                return json;
              });
            },
          },
          LOGIN_FAILURE
        ]
      }
    });
  };
}
