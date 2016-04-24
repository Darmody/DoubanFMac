import React, { Component, PropTypes } from 'react';
import { shell } from 'electron';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectModal } from 'redux-modal';
import { Signin } from 'components';
import { login } from 'reducers/auth';

@connectModal({ name: 'signin' })
@connect(
  () => ({}),
  dispatch => ({
    ...bindActionCreators({ login }, dispatch)
  })
)
export default class SigninContainer extends Component {
  static propTypes = {
    handleHide: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    show: PropTypes.bool,
  }

  goToRegister = () => {
    shell.openExternal('http://www.douban.com/accounts/register');
  }

  render() {
    return (
      <Signin
        {...this.props}
        goToRegister={this.goToRegister}
        hideModal={this.props.handleHide}
      />
    );
  }
}
