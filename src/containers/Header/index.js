// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Header } from 'components'

type Props = {
  auth: boolean,
}

class HeaderContainer extends PureComponent {
  props: Props

  render() {
    return (
      <Header auth={this.props.auth} />
    )
  }
}

export default connect(
  state => ({
    auth: state.auth.id,
  })
)(HeaderContainer)
