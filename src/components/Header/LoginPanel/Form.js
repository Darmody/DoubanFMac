// @flow
import R from 'ramda'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import styled from 'styled-components'
import { login } from 'actions/auth'

const LoginForm = styled.form`
  width: 22.375rem;
  padding: 3.75rem 3.75rem 3.125rem 3.75rem;
`
const Title = styled.h2`
  text-align: center;
  font-size: 1.563rem;
  font-weight: normal;
  margin-bottom: 1.875rem;
  line-height: 1rem;
`

const FieldWrapper = styled.div`
  position: relative;
  height: 2.5rem;
  margin-top: .875rem;
  overflow: hidden;
`

type InputProps = {
  className: string,
  input: Object,
  placeholder: string,
  type: string,
}
const ReduxInput = ({
  input,
  type = 'text',
  placeholder = '',
  className = '',
}: InputProps) => (
  <input type={type} placeholder={placeholder} {...input} className={className} />
)
const Input = styled(ReduxInput)`
  border: 1px solid #ccc;
  width: calc(100% - .75rem);
  height: .875rem;
  line-height: .875rem;
  padding: .75rem 0 .75rem .625rem;
  color: #111;
  font-size: .813rem;
  outline: none;
  cursor: text;
  border-radius: 3px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.06);
`

const ErrorMessage = styled.span`
  position: absolute;
  line-height: 40px;
  font-size: .813rem;
  color: #EF2617;
  right: .938rem;
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

type Props = {
  authed: boolean,
  closeModal: Function,
  handleSubmit: Function,
  loginFailed: boolean,
}

class LoginFormComponent extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (!this.props.authed && nextProps.authed) {
      this.props.closeModal()
    }
  }

  props: Props

  renderUsernameField = ({ meta, ...restProps }) => (
    <FieldWrapper>
      <Input meta={meta} {...restProps} />
      {this.props.loginFailed && (
        <ErrorMessage>用户名或密码错误</ErrorMessage>
      )}
    </FieldWrapper>
  )

  render() {
    return (
      <LoginForm>
        <Title>欢迎来到豆瓣, 请登录</Title>
        <Field
          name="username"
          type="text"
          placeholder="手机号/邮箱/用户名"
          component={this.renderUsernameField}
        />
        <FieldWrapper>
          <Field
            name="password"
            type="password"
            placeholder="密码"
            component={Input}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Button type="submit" value="登录豆瓣" onClick={this.props.handleSubmit} />
        </FieldWrapper>
      </LoginForm>
    )
  }
}

export default R.compose(
  reduxForm({
    form: 'login',
    onSubmit: (values, dispatch) => dispatch(login(values.username, values.password)),
  }),
  connect(
    state => ({
      authed: state.auth.id,
      loginFailed: state.auth.loginFailed,
    })
  )
)(LoginFormComponent)
