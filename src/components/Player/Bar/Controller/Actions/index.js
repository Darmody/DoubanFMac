// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ActionBar from './ActionBar'
import InfoBar from './InfoBar'
import ProcessBar from './ProcessBar'

const Actions = styled.div`
`

type Props = {
  muted: boolean,
  playing: boolean,
  playingStep: number,
  setVolume: Function,
  songBuffer: number,
  toggleMuted: Function,
  togglePlaying: Function,
  volume: number,
}

export default class ActionsComponent extends PureComponent {
  props: Props

  render() {
    return (
      <Actions>
        <InfoBar
          step={this.props.playingStep}
          toggleMuted={this.props.toggleMuted}
          volume={this.props.volume}
          setVolume={this.props.setVolume}
          muted={this.props.muted}
        />
        <ProcessBar
          buffer={this.props.songBuffer}
          step={this.props.playingStep}
        />
        <ActionBar
          togglePlaying={this.props.togglePlaying}
          playing={this.props.playing}
        />
      </Actions>
    )
  }
}
