// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'

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
  handleSubmit: Function,
}

export default class LoginFormComponent extends PureComponent {
  props: Props

  render() {
    return (
      <LoginForm>
        <Title>欢迎来到豆瓣, 请登录</Title>
        <FieldWrapper>
          <Field
            name="username"
            type="text"
            placeholder="手机号/邮箱/用户名"
            component={Input}
          />
        </FieldWrapper>
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
