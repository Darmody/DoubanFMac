import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

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

const LoginForm = styled.form`
  width: 22.375rem;
  padding: 3.75rem 3.75rem 3.125rem 3.75rem;
`

const Field = styled.div`
  height: 2.5rem;
  margin-top: .875rem;
  overflow: hidden;
`

const Input = styled.input`
  border: 1px solid #ccc;
  width: 21rem;
  height: .875rem;
  line-height: .875rem;
  padding: .75rem 2.5rem .75rem .625rem;
  color: #111;
  font-size: .813rem;
  outline: none;
  cursor: text;
  border-radius: 3px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.06);
`

const Button = styled.input`
  display: block;
  border: none;
  width: 100%;
  height: 2.5rem;
  border-radius: 3px;
  background-color: #59b36a;
  color: white;
  cursor: pointer;
`

const Title = styled.h2`
  text-align: center;
  font-size: 1.563rem;
  font-weight: normal;
  margin-bottom: 1.875rem;
  line-height: 1rem;
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


export default class LoginPanelContainer extends PureComponent {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false,
    }
  }

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
          <LoginForm>
            <Title>欢迎来到豆瓣, 请登录</Title>
            <Field>
              <Input type="text" placeholder="手机号/邮箱/用户名" />
            </Field>
            <Field>
              <Input type="password" placeholder="密码" />
            </Field>
            <Field>
              <Button type="submit" value="登录豆瓣" />
            </Field>
          </LoginForm>
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
