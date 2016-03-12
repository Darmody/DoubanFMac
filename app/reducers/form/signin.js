import { LOGIN_FAILURE } from 'reducers/auth';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
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
    default:
      return state;
  }
};
