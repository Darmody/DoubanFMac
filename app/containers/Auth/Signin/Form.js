import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

@reduxForm({
  form: 'signin',
  fields: ['alias', 'formPassword', 'captchaSolution', 'captchaId']
}, state => ({
  logged: state.auth.logged
}))
export default class Form extends Component {
  static propTypes = {
    captchaCode: PropTypes.string,
    error: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    refreshCaptcha: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    logged: PropTypes.bool,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.captchaCode !== nextProps.captchaCode) {
      this.props.fields.captchaId.onChange(nextProps.captchaCode);
    }

    if (!this.props.logged && nextProps.logged) {
      this.props.hideModal('signin');
    }
  }

  renderErrorMessage = () => {
    if (this.props.error) {
      return (
        <span className="errorMessage">
          {this.props.error}
        </span>
      );
    }

    return null;
  }

  render() {
    const {
      fields: { alias, formPassword, captchaSolution, captchaId },
      handleSubmit,
      captchaCode,
    } = this.props;

    return (
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
          <a href="#" onClick={this.props.refreshCaptcha}>
            { captchaCode && <img src={`http://douban.fm/misc/captcha?size=m&id=${captchaCode}`} /> }
          </a>
        </div>
        <div className="toolbar">
          { this.renderErrorMessage() }
          <button type="submit" className="button">登&nbsp;录</button>
        </div>
      </form>
    );
  }
}
