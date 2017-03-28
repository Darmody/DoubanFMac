// @flow
import R from 'ramda'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { login } from 'actions/auth'

type Props = {
  authed: boolean,
  component: ReactClass<*>,
  handleSubmit: Function,
  closeModal: Function,
}

class LoginFormContainer extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (!this.props.authed && nextProps.authed) {
      this.props.closeModal()
    }
  }

  props: Props

  render() {
    const Component = this.props.component

    return <Component handleSubmit={this.props.handleSubmit} />
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
    })
  )
)(LoginFormContainer)
