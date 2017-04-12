// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { shell } from 'electron'
import { logout } from 'actions/auth'
import { like, dislike, current as jump } from 'actions/songs'
import { selectCurrent as selectCurrentUser } from 'selectors/users'
import { selectSongs } from 'selectors/songs'
import { selectCurrent as selectCurrentChannel } from 'selectors/channels'
import { Play as IconPlay, Love as IconLove } from 'components/Icons'

const borderColor = '#E1E1E1'

const DropdownMenu = styled.div`
  position: absolute;
  transform: translate(-2%, 0%);
  top: 1.7rem;
  right: 0;
  display: none;
  width: 15.75rem;
  background-color: #FBFBFB;
  border-top: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
`

const MenuItem = styled.div`
  width: 100%;
  padding: 1.063rem 1.188rem;
  box-sizing: border-box;
  border-bottom: 1px solid ${borderColor};

  > a {
    color: #62646c;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
  }
`

const FMInfo = styled.div`
  margin-top: .938rem;
`

const Info = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #62646C;

  a {
    color: #030303;
    text-decoration: underline;
  }
`

const SongMenuItem = styled(MenuItem)`
  background-color: #FFFFFF;
`

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: .625rem;
`

const SongDetail = styled.div`
  width: 11.25rem;
  margin: 0 .8rem;
`

const SongTitle = styled.a`
  display: block;
  color: #030303;
  font-size: .933rem;
  font-weight: 400;
  line-height: 1.25rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const SongArtist = styled.a`
  display: block;
  color: #8f8E94;
  font-size: .75rem;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const BasicInfo = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  border-radius: 50%;
  height: 2.25rem;
  width: 2.25rem;
  margin-right: .625rem;
`

const Name = styled.h3`
  color: #030303;
  font-size: .938rem;
  font-weight: 400;
  line-height: 1.313rem;
`

const IconLink = styled.a`
  svg {
    cursor: pointer;
    * {
      cursor: pointer;
    }
  }
`

type Props = {
  channelId: number,
  dislike: Function,
  jump: Function,
  like: Function,
  logout: Function,
  me: Object,
  playedSongs: [],
}

class DropdownMenuComponent extends PureComponent {
  props: Props

  goToAccountSettings = () => shell.openExternal('https://www.douban.com/accounts')
  handleJump = song => () => this.props.jump(song)
  handleFavorite = song => () => {
    if (song.like) {
      this.props.dislike(this.props.channelId, song.sid)
    } else {
      this.props.like(this.props.channelId, song.sid)
    }
  }

  render() {
    const { me, playedSongs } = this.props
    return (
      <DropdownMenu className="dropdown-menu">
        <MenuItem>
          <BasicInfo>
            <Avatar src={me.icon} alt="" />
            <Name>{me.name}</Name>
          </BasicInfo>
          <FMInfo>
            <Info>
              累计收听<a href="javascript:void(0);">{me.playedNum}</a>首
            </Info>
            <Info>
              红心<a href="javascript:void(0);">{me.likedNum}</a>首
              不再播放<a href="javascript:void(0);">{me.bannedNum}</a>首
            </Info>
          </FMInfo>
        </MenuItem>
        <SongMenuItem>
          {playedSongs.map(song => (
            <SongInfo key={song.sid}>
              <IconLink href="javascript:void(0);" onClick={this.handleJump(song)}>
                <IconPlay size={8} color="#A8A8A8" />
              </IconLink>
              <SongDetail>
                <SongTitle href="javascript:void(0);">{song.title}</SongTitle>
                <SongArtist href="javascript:void(0);">{song.artist}</SongArtist>
              </SongDetail>
              <IconLink href="javascript:void(0);" onClick={this.handleFavorite(song)}>
                <IconLove red={song.like} size={10} color="#A8A8A8" />
              </IconLink>
            </SongInfo>
          ))}
        </SongMenuItem>
        <MenuItem>
          <a href="javascript:void(0);" onClick={this.goToAccountSettings}>账户设置</a>
        </MenuItem>
        <MenuItem>
          <a href="javascript:void(0);" onClick={this.props.logout}>退出</a>
        </MenuItem>
      </DropdownMenu>
    )
  }
}

export default connect(
  state => ({
    me: selectCurrentUser(state) || {},
    channelId: selectCurrentChannel(state),
    playedSongs: selectSongs(state, state.songs.playedIds),
  }), {
    logout, like, dislike, jump,
  }
)(DropdownMenuComponent)
