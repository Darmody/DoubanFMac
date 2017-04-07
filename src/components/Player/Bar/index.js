// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Controller from './Controller'

const Bar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Cover = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
`

type Props = {
  song: {
    sid: number,
    title: string,
    artist: string,
    picture: string,
    url: string,
  },
}

export default class BarComponent extends PureComponent {
  props: Props

  render() {
    return (
      <Bar>
        <Controller
          songName={this.props.song.title}
          songId={this.props.song.sid}
          artist={this.props.song.artist}
          source={this.props.song.url}
        />
        <Cover src={this.props.song.picture} />
      </Bar>
    )
  }
}
