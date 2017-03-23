// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {
  Radio as IconRadio,
  Playlist as IconPlaylist,
  HollowLove as IconLove,
  Search as IconSearch,
} from 'components/Icons'
import IconButton from './IconButton'

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.25rem;
`

export default class NavbarComponent extends PureComponent {
  render() {
    return (
      <Navbar>
        <IconButton><IconRadio /> 兆赫</IconButton>
        <IconButton><IconPlaylist />  歌单</IconButton>
        <IconButton><IconLove />  我的</IconButton>
        <IconButton><IconSearch /> 搜索</IconButton>
      </Navbar>
    )
  }
}
