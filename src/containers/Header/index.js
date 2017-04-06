// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { selectCurrent } from 'selectors/users'
import { Header } from 'components'

type Props = {
  me?: Object,
}

class HeaderContainer extends PureComponent {
  static defaultProps = {
    me: undefined,
  }

  props: Props

  render() {
    return (
      <Header me={this.props.me} />
    )
  }
}

export default connect(
  state => ({
    me: selectCurrent(state),
  })
)(HeaderContainer)
