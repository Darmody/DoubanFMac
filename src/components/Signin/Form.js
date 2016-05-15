import React from 'react';

const ErrorMessage = ({ error }) => {
  if (error) {
    return (
      <span className="errorMessage">
        {error}
      </span>
    );
  }

  return null;
};

export default ({
  fields: { alias, formPassword, captchaSolution, captchaId },
  error, handleSubmit, captchaCode, fetchCaptcha,
}) => (
  <form onSubmit={handleSubmit}>
    <h2 className="header"> 登录 </h2>
    <input type="hidden" {...captchaId} />
    <div className="field">
      <input type="text" placeholder="邮箱" {...alias} />
    </div>
    <div className="field">
      <input type="password" placeholder="密码" {...formPassword} />
    </div>
    <div className="captchaField">
      <input type="text" className="field" placeholder="验证码" {...captchaSolution } />
      <button onClick={fetchCaptcha}>
        { captchaCode && <img src={`http://douban.fm/misc/captcha?size=m&id=${captchaCode}`} /> }
      </button>
    </div>
    <div className="toolbar">
      <ErrorMessage error={error}/>
      <button type="submit" className="button">登&nbsp;录</button>
    </div>
  </form>
);
