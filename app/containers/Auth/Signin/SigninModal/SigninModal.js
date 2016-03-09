import React, { Component } from 'react';
import Modal from 'react-modal';
import { connectModal } from 'redux-modal';
import { shell } from 'electron';
import styles from './SigninModal.scss';
import captchaImage from './captcha.jpeg'; // Just for testing.

@connectModal('signin')
export default class SigninModal extends Component {

  hideModal = () => {
    this.props.handleHide();
  }

  goToRegister = () => {
    shell.openExternal('http://www.douban.com/accounts/register');
  }

  render() {
    const { modal: { show, params } } = this.props;
    const modalStyle = {
      content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        height: '45%',
        width: '60%',
        borderRadius: '1%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }
    };

    return (
      <Modal isOpen={show} style={modalStyle} >
        <div className={styles.signinModal}>
          <a href="#" className="closeButton" onClick={this.hideModal}>X</a>
          <div className="content">
            <h2 className="header"> 登录 </h2>
            <div className="field"> <input type="text" placeholder="邮箱/用户名" /> </div>
            <div className="field"> <input type="password" placeholder="密码" /> </div>
            <div className="captchaField">
              <input type="text" className="field" placeholder="验证码" />
              <image src={captchaImage} />
            </div>
            <a href="#" className="button">登&nbsp;录</a>
          </div>
          <div className="footer">
            <a href="#" className="registerLink" onClick={this.goToRegister}>去豆瓣注册</a>
          </div>
        </div>
      </Modal>
    );
  }
}
