import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import { shell } from 'electron';
import { login } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import Form from './Form';
import styles from './Signin.scss';

@connectModal({ name: 'signin' })
@connect(
  state => ({
    captchaCode: state.captcha.code,
  }),
  dispatch => ({
    ...bindActionCreators({ login, fetchCaptcha }, dispatch)
  })
)
export default class Signin extends Component {
  static propTypes = {
    captchaCode: PropTypes.string,
    fetchCaptcha: PropTypes.func.isRequired,
    handleHide: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    show: PropTypes.bool,
  }

  hideModal = () => {
    this.props.handleHide();
  }

  goToRegister = () => {
    shell.openExternal('http://www.douban.com/accounts/register');
  }

  refreshCaptcha = () => {
    this.props.fetchCaptcha();
  }

  loginUser = (data) => {
    this.props.login(data);
  }

  render() {
    const { show, captchaCode } = this.props;
    const modalStyle = {
      content: {
        top: '10%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, 0%)',
        height: '60%',
        width: '60%',
        borderRadius: '1%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }
    };

    return (
      <Modal isOpen={show} style={modalStyle} >
        <div className={styles.signinModal}>
          <a href="#" className="closeButton" onClick={this.hideModal}>X</a>
          <Form
            onSubmit={this.loginUser}
            hideModal={this.hideModal}
            captchaCode={captchaCode}
            refreshCaptcha={this.refreshCaptcha}
          />
          <div className="footer">
            <a href="#" className="registerLink" onClick={this.goToRegister}>去豆瓣注册</a>
          </div>
        </div>
      </Modal>
    );
  }
}
