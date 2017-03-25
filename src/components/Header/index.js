// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import UserPanel from './UserPanel'
import LoginPanel from './LoginPanel'
import LogoImage from './logo.svg'

const HeaderWrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45.975rem;
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
  props: {
    auth: boolean,
  }

  renderUserPanel = () => {
    if (this.props.auth) {
      return <UserPanel />
    }

    return <LoginPanel />
  }
  render() {
    return (
      <HeaderWrapper>
        <Header>
          <FrontPanel>
            <Logo src={LogoImage} alt="" />
            <FeedBack href="javascript:void(0);">我要反馈</FeedBack>
          </FrontPanel>
          {this.renderUserPanel()}
        </Header>
      </HeaderWrapper>
    )
  }
}
