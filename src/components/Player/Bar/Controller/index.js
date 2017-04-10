// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Actions from './Actions'

const Controller = styled.div`
  margin-left: 1.375rem;
  width: 26.875rem;
`

const Name = styled.a`
  display: block;
  line-height: 1.28;
  font-size: 1.563rem;
  font-weight: 400;
  color: rgb(3, 3, 3);
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: .5rem;

  &:hover {
    text-decoration: underline;
  }
`
const Artist = styled.a`
  display: block;
  line-height: 1.2;
  font-size: .938rem;
  font-weight: 400;
  color: rgb(74, 74, 74);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

type Props = {
  channelId: number,
  song: Object,
  next: Function,
  mark: Function,
}

export default class ControllerComponent extends PureComponent {
  props: Props

  handleEnded = () => {
    const { channelId, song } = this.props
    this.props.mark(channelId, song.sid)
    this.props.next(channelId, song.sid)
  }

  render() {
    const { song } = this.props
    return (
      <Controller>
        <audio
          src={song.url}
          autoPlay
          onEnded={this.handleEnded}
        />
        <Name href="javascript:void(0);">{song.title}</Name>
        <Artist href="javascript:void(0);">{song.artist}</Artist>
        <Actions />
      </Controller>
    )
  }
}
