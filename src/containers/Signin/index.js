import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectModal } from 'redux-modal';
import { Signin } from 'components';
import { login } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';

@connectModal({ name: 'signin' })
@connect(
  state => ({
    captchaCode: state.captcha.code,
  }),
  dispatch => ({
    ...bindActionCreators({ login, fetchCaptcha }, dispatch)
  })
)
export default class SigninContainer extends Component {
  static propTypes = {
    captchaCode: PropTypes.string,
    fetchCaptcha: PropTypes.func.isRequired,
    handleHide: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    show: PropTypes.bool,
  }

  render() {
    return <Signin {...this.props} />;
  }
}
