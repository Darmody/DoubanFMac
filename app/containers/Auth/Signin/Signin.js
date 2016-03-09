import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectModal } from 'redux-modal';
import Modal from 'react-modal';
import { shell } from 'electron';
import { fetch as fetchCaptcha } from 'reducers/doubanCaptcha';
import styles from './Signin.scss';

@connectModal({ name: 'signin' })
@connect(
  state => ({
    captchaCode: state.doubanCaptcha.code,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchCaptcha }, dispatch)
  })
)
export default class Signin extends Component {
  componentDidMount() {
    this.props.fetchCaptcha();
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

  render() {
    const { modal: { show, params}, captchaCode } = this.props;
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
              <a href="#" onClick={this.refreshCaptcha}>
                { captchaCode && <img src={`http://douban.fm/misc/captcha?size=m&id=${captchaCode}`} /> }
              </a>
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
