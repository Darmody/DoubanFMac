import React, { PureComponent } from 'react'
import styled from 'styled-components'
import UserPanel from './UserPanel'
import LogoImage from './logo.svg'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  width: 100%;
  margin: 1.75rem auto;
`

const FrontPanel = styled.div`
  display: flex;
  align-items: flex-start;
`

const Logo = styled.img`
  height: 2.5rem;
  width: 6.25rem;
`

const FeedBack = styled.a`
  font-size: 12px;
  color: #8f8e94;
  text-decoration: none;
  cursor: pointer;
  margin: 0.188rem 0 0 2.5rem;
`

export default class HeaderContainer extends PureComponent {
  render() {
    return (
      <Header>
        <FrontPanel>
          <Logo src={LogoImage} alt="" />
          <FeedBack href="javascript:void(0);">我要反馈</FeedBack>
        </FrontPanel>
        <UserPanel />
      </Header>
    )
  }
}
