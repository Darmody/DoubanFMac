import { handleActions } from 'redux-actions';
import { LOGIN_FAILURE } from '../../actionTypes/auth';

export default handleActions({
  [LOGIN_FAILURE]: (state, action) => {
    const errorMessages = {
      'invalidate_email': '无效的登录邮箱',
      'no_email': '未填写邮箱',
      'no_password': '未填写密码',
      'wrong_email': '账号不存在',
      'wrong_password': '账号或密码不正确',
    };

    return {
      ...state,
      _error: errorMessages[action.error] || action.error,
      _submitting: false
    };
  }
});
