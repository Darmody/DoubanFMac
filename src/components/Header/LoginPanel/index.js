// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { LoginForm as LoginFormContainer } from 'containers'
import Form from './Form'

const LoginPanel = styled.a`
  font-size: .75rem;
  margin-left: .625rem;
  line-height: 1.5rem;
  color: #8f8e94;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}
`

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

type Props = {
}

type State = {
  modalIsOpen: boolean,
}

export default class LoginPanelContainer extends PureComponent {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
    }
  }

  state: State
  props: Props

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="登录"
          style={modalStyle}
        >
          <LoginFormContainer component={Form} closeModal={this.closeModal} />
        </Modal>
        <LoginPanel
          href="javascript:void(0);"
          onClick={this.openModal}
        >
          登录
        </LoginPanel>
      </div>
    )
  }
}
