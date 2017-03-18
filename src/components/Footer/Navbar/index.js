import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'
import {
  Radio as IconRadio,
  Playlist as IconPlaylist,
  HollowLove as IconLove,
  Search as IconSearch,
} from 'components/Icons'

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.25rem;
`

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin: 2.5rem;
  line-height: 1.375rem;
  height: 1.375rem;
  text-decoration: none;
  font-size: .875rem;
  color: #75747b;

  svg {
    cursor: pointer;
    margin-right: .5rem;
    * {
      cursor: pointer;
    }
  }
`
const IconButton = props => (
  <StyledLink href="javascript:void(0);">{props.children}</StyledLink>
)
IconButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ])).isRequired,
}

export default class NavbarContainer extends PureComponent {
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
