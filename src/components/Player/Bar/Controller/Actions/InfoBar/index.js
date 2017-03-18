import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'
import {
  Create as IconCreate,
  Download as IconDownload,
  Lyrics as IconLyrics,
  Share as IconShare,
  Volume as IconVolume,
} from 'components/Icons'

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

const StyledLink = styled.a`
  &:not(:last-child) {
    margin-right: 1.563rem;
  }

  svg {
    cursor: pointer;
    * {
      cursor: pointer;
    }
  }
`
const Link = props => (
  <StyledLink href="javascript:void(0);">{props.children}</StyledLink>
)
Link.propTypes = {
  children: PropTypes.element.isRequired,
}

export default class InfoBarContainer extends PureComponent {
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
          <Link><IconLyrics /></Link>
          <Link><IconDownload /></Link>
          <Link><IconCreate /></Link>
          <Link><IconShare /></Link>
        </Links>
      </InfoBar>
    )
  }
}
