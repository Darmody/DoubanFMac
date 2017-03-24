// @flow
import React, { PureComponent } from 'react'
import { reduxForm } from 'redux-form'

type Props = {
  component: ReactClass<*>,
  handleSubmit: Function,
}

class LoginFormContainer extends PureComponent {
  props: Props

  render() {
    const Component = this.props.component

    return <Component handleSubmit={this.props.handleSubmit} />
  }
}

export default reduxForm({
  form: 'login'
})(LoginFormContainer)
