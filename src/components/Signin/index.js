import React from 'react';
import Modal from 'react-modal';
import { SigninForm } from 'containers';
import styles from './styles.scss';

const signinComponent = ({ show, hideModal, goToRegister, login }) => {
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
        <button className="closeButton" onClick={hideModal}>X</button>
        <SigninForm hideModal={hideModal} onSubmit={login} />
        <div className="footer">
          <button className="registerLink" onClick={goToRegister}>去豆瓣注册</button>
        </div>
      </div>
    </Modal>
  );
};

export default signinComponent;
