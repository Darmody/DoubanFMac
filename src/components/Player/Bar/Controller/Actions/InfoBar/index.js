import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  // Create as IconCreate,
  // Download as IconDownload,
  // Lyrics as IconLyrics,
  // Share as IconShare,
} from 'components/Icons'
import { selectCurrent as selectCurrentSong } from 'selectors/songs'
import VolumeController from './VolumeController'
// import Link from './Link'

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1.125rem 0 .3rem;
`

const Header = styled.div`
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
  toggleMuted: Function,
  total: number,
  setVolume: Function,
  step: number,
  volume: number,
}

class InfoBarComponent extends PureComponent {
  props: Props

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
          <VolumeController
            toggleMuted={this.props.toggleMuted}
            volume={this.props.volume}
            setVolume={this.props.setVolume}
          />
        </Header>
        <Links>
          {/* <Link><IconLyrics /></Link>
          <Link><IconDownload /></Link>
          <Link><IconCreate /></Link>
          <Link><IconShare /></Link> */}
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
