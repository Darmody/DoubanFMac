import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';

export const FETCH_REQUEST = 'CAPTCHA/FETCH_REQUEST';
export const FETCH_SUCCESS = 'CAPTCHA/FETCH_SUCCESS';
export const FETCH_FAILURE = 'CAPTCHA/FETCH_FAIL';

const initialState = Immutable({
  code: '',
});

export default handleActions({
  [FETCH_SUCCESS]: (state, action) => ({
    ...state,
    code: action.payload,
  }),
}, initialState);

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
