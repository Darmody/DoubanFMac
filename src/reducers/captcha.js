import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../actionTypes/captcha';

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
      credentials: 'include',
      types: [
        FETCH_REQUEST,
        FETCH_SUCCESS,
        FETCH_FAILURE
      ]
    }
  };
}
