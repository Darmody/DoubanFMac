// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Love as IconLove,
  Pause as IconPause,
  Play as IconPlay,
  Skip as IconSkip,
  Trash as IconTrash,
} from 'components/Icons'
import { ban, like, dislike, next, } from 'actions/songs'
import { selectCurrent as selectCurrentSong } from 'selectors/songs'
import { selectCurrent as selectCurrentChannel } from 'selectors/channels'
import Button from './Button'

const DISLIKE_CODE = 0

const ActionBar = styled.div`
  margin-top: 3.688rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Head = styled.div`
  display: inline-block;

  a:not(:last-child) {
    margin-right: 2rem;
  }
`

const Tail = styled.div`
  display: inline-block;

  a:not(:last-child) {
    margin-right: 3.75rem;
  }
`

type Props = {
  ban: Function,
  channelId: number,
  dislike: Function,
  like: Function,
  next: Function,
  playing: boolean,
  song: Object,
  togglePlaying: Function,
}

class ActionBarComponent extends PureComponent {
  props: Props

  isLike = () => this.props.song.like && this.props.song.like !== DISLIKE_CODE

  handleFavorite = () => {
    const { channelId, song, like, dislike } = this.props

    if (this.isLike()) {
      dislike(channelId, song.sid)
    } else {
      like(channelId, song.sid)
    }
  }

  handleSkip = () => this.props.next(this.props.channelId, this.props.song.sid)
  handleBan = () => this.props.ban(this.props.channelId, this.props.song.sid)

  renderPlayOrPauseButton = () => (
    <Button onClick={this.props.togglePlaying}>
      {this.props.playing ? <IconPause /> : <IconPlay />}
    </Button>
  )

  render() {
    return (
      <ActionBar>
        <Head>
          <Button onClick={this.handleFavorite}>
            <IconLove red={this.isLike()} />
          </Button>
          <Button onClick={this.handleBan}><IconTrash /></Button>
        </Head>
        <Tail>
          {this.renderPlayOrPauseButton()}
          <Button onClick={this.handleSkip}><IconSkip /></Button>
        </Tail>
      </ActionBar>
    )
  }
}

export default connect(
  state => ({
    song: selectCurrentSong(state) || {},
    channelId: selectCurrentChannel(state),
  }),
  { ban, like, dislike, next, },
)(ActionBarComponent)
