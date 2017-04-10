import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Create as IconCreate,
  Download as IconDownload,
  Lyrics as IconLyrics,
  Share as IconShare,
  Volume as IconVolume,
} from 'components/Icons'
import { selectCurrent as selectCurrentSong } from 'selectors/songs'
import Link from './Link'

const ipc = require('electron').ipcRenderer

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: .625rem 0 .3rem;
`

const Header = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Time = styled.span`
  color: rgb(155, 155, 155);
  font-weight: 400;
  font-size: .75rem;
  width: 2.5rem;
  margin-right: .625rem;

  &:before {
    content: '-';
  }
`

const Links = styled.span`
  display: inline-flex;
  align-items: center;
`

type Props = {
  total: number,
  step: number,
}

class InfoBarComponent extends PureComponent {
  props: Props

  handleLyricsClick = () => {
    ipc.send('lyricsWindow', 'toggle')
  }

  formatTime = () => {
    const remainSeconds = this.props.total - this.props.step
    const date = new Date(null)
    date.setSeconds(remainSeconds)
    return date.toISOString().substr(14, 5)
  }

  render() {
    return (
      <InfoBar>
        <Header>
          <Time>{this.formatTime()}</Time>
          <IconVolume />
        </Header>
        <Links>
          <Link onClick={this.handleLyricsClick}><IconLyrics /></Link>
          <Link><IconDownload /></Link>
          <Link><IconCreate /></Link>
          <Link><IconShare /></Link>
        </Links>
      </InfoBar>
    )
  }
}

export default connect(
  state => ({
    total: (selectCurrentSong(state) || {}).length || 1,
  }),
)(InfoBarComponent)
