import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { SigninForm } from 'components';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import { login } from 'reducers/auth';

@reduxForm({
  form: 'signin',
  fields: ['alias', 'formPassword', 'captchaSolution', 'captchaId']
}, state => ({
  captchaCode: state.captcha.code,
  logged: state.auth.logged
}), dispatch => ({
  ...bindActionCreators({ fetchCaptcha, login }, dispatch)
}))
export default class SigninFormContainer extends Component {
  static propTypes = {
    captchaCode: PropTypes.string,
    error: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fetchCaptcha: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    logged: PropTypes.bool,
  }

  componentDidMount() {
    this.props.fetchCaptcha();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.captchaCode !== nextProps.captchaCode) {
      this.props.fields.captchaId.onChange(nextProps.captchaCode);
    }

    if (!this.props.logged && nextProps.logged) {
      this.props.hideModal('signin');
    }
  }

  render() {
    return (
      <SigninForm {...this.props} />
    );
  }
}
