// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ActionBar from './ActionBar'
import InfoBar from './InfoBar'
import ProcessBar from './ProcessBar'

const Actions = styled.div`
`

type Props = {
  togglePlaying: Function,
  playing: boolean,
}

export default class ActionsComponent extends PureComponent {
  props: Props

  render() {
    return (
      <Actions>
        <InfoBar />
        <ProcessBar />
        <ActionBar
          togglePlaying={this.props.togglePlaying}
          playing={this.props.playing}
        />
      </Actions>
    )
  }
}
