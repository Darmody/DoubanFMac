// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { selectCurrent } from 'selectors/songs'
import { Player } from 'components'

type Props = {
  song?: {},
}

class PlayerContainer extends PureComponent {
  static defaultProps = {
    song: {},
  }

  props: Props

  render() {
    return (
      <Player song={this.props.song} />
    )
  }
}

export default connect(
  state => ({
    song: selectCurrent(state) || {},
  })
)(PlayerContainer)
