import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';

const FETCH_REQUEST = 'CAPTCHA/FETCH_REQUEST';
const FETCH_SUCCESS = 'CAPTCHA/FETCH_SUCCESS';
const FETCH_FAILURE = 'CAPTCHA/FETCH_FAIL';

const initialState = Immutable({
  code: '',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        code: action.payload,
      };
    default:
      return state;
  }
};

export function fetch() {
  return {
    [CALL_API]: {
      endpoint: 'http://douban.fm/j/new_captcha',
      method: 'GET',
      types: [
        FETCH_REQUEST,
        FETCH_SUCCESS,
        FETCH_FAILURE
      ]
    }
  };
}
