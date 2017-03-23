import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {
  Create as IconCreate,
  Download as IconDownload,
  Lyrics as IconLyrics,
  Share as IconShare,
  Volume as IconVolume,
} from 'components/Icons'
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
`

const Time = styled.span`
  color: rgb(155, 155, 155);
  font-weight: 400;
  font-size: .75rem;
  margin-right: .625rem;

  &:before {
    content: '-';
  }
`

const Links = styled.span`
  display: inline-flex;
  align-items: center;
`

export default class InfoBarComponent extends PureComponent {
  handleLyricsClick = () => {
    ipc.send('lyricsWindow', 'toggle')
  }

  render() {
    return (
      <InfoBar>
        <Header>
          <Time>
            04:50
          </Time>
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
