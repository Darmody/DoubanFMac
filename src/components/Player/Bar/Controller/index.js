// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { playlist as fetchPlaylist, mark } from 'actions/songs'
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
  songName: string,
  songId: number,
  artist: string,
  source: string,
  fetchPlaylist: Function,
  mark: Function,
}

class ControllerComponent extends PureComponent {
  props: Props

  handleEnded = () => {
    this.props.mark(0, this.props.songId)
    this.props.fetchPlaylist(0, 'p', this.props.songId)
  }

  render() {
    return (
      <Controller>
        <audio
          src={this.props.source}
          autoPlay
          onEnded={this.handleEnded}
        />
        <Name href="javascript:void(0);">{this.props.songName}</Name>
        <Artist href="javascript:void(0);">{this.props.artist}</Artist>
        <Actions />
      </Controller>
    )
  }
}

export default connect(
  null,
  { fetchPlaylist, mark },
)(ControllerComponent)
