import { handleActions } from 'redux-actions';
import { LOGIN_FAILURE } from '../../actionTypes/auth';

export default handleActions({
  [LOGIN_FAILURE]: (state, action) => {
    return {
      ...state,
      _error: action.error,
      _submitting: false
    };
  }
});
