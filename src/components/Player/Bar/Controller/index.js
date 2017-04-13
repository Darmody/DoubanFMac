// @flow
import React, { PureComponent } from 'react'
import { Observable as Rx$ } from 'rxjs'
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

type States = {
  playing: boolean,
  playingStep: number,
  songBuffer: number,
  volume: number,
  muted: boolean,
}

export default class ControllerComponent extends PureComponent {
  constructor(props: Props) {
    super(props)

    this.state = {
      playing: false,
      songBuffer: 0,
      playingStep: 0,
      volume: 1,
      muted: false,
    }
  }

  state: States

  componentWillUnmount() {
    if (this.progressWatcher) {
      this.progressWatcher.unsubscribe()
    }
  }

  setRef = (ref: HTMLAudioElement) => {
    if (!ref) { return }

    this.audio = ref
    this.audio.onplaying = () => { this.setState({ playing: true }) }
    this.audio.onpause = () => { this.setState({ playing: false }) }

    const updateProgress = () => {
      let songBuffer = 0
      if (this.audio.buffered.length > 0) {
        songBuffer = this.audio.buffered.end(this.audio.buffered.length - 1)
      }

      return ({
        songBuffer,
        playingStep: this.audio.currentTime || 0,
      })
    }
    this.progressWatcher = Rx$
      .interval(1000)
      .map(updateProgress)
      .subscribe(data => this.setState(data))
  }

  setVolume = (volume: number) => {
    if (this.audio) {
      this.audio.volume = volume
      this.setState({ volume })
    }
  }

  progressWatcher = undefined
  audio = {}
  props: Props

  handleEnded = () => {
    const { channelId, song } = this.props
    this.props.mark(channelId, song.sid)
    this.props.next(channelId, song.sid)
  }

  togglePlaying = () => {
    if (this.audio) {
      this.state.playing ? this.audio.pause() : this.audio.play()
    }
  }

  toggleMuted = () => {
    if (this.audio) {
      this.audio.muted = !this.audio.muted
      this.setState({ muted: this.audio.muted })
    }
  }

  render() {
    const { song } = this.props
    const { songBuffer, playing, playingStep, muted, volume } = this.state
    return (
      <Controller>
        <audio
          ref={this.setRef}
          src={song.url}
          autoPlay
          onEnded={this.handleEnded}
        />
        <Name href="javascript:void(0);">{song.title}</Name>
        <Artist href="javascript:void(0);">{song.artist}</Artist>
        <Actions
          muted={muted}
          playing={playing}
          playingStep={playingStep || 0}
          setVolume={this.setVolume}
          songBuffer={songBuffer || 0}
          toggleMuted={this.toggleMuted}
          togglePlaying={this.togglePlaying}
          volume={volume}
        />
      </Controller>
    )
  }
}
