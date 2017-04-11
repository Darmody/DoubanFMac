// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { shell } from 'electron'
import { selectCurrent } from 'selectors/users'
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
  padding-top: .625rem;
`

const FrontPanel = styled.div`
  display: flex;
  align-items: flex-start;
`

const Logo = styled.img`
  height: 2.5rem;
  width: 6.25rem;
`

const menuLinkStyle = `
  font-size: 12px;
  color: #8f8e94;
  text-decoration: none;
  cursor: pointer;
  margin: 0.188rem 0 0 2.5rem;
`

const FeedBack = styled.a`
  ${menuLinkStyle}
`

const VisitOfficial = styled.a`
  ${menuLinkStyle}
`

class HeaderComponent extends PureComponent {
  static defaultProps = {
    me: undefined,
  }

  props: {
    me?: Object,
  }

  handleVisitOfficial = () => shell.openExternal('https://douban.fm')

  renderUserPanel = () => {
    if (this.props.me) {
      return <UserPanel me={this.props.me} />
    }

    return <LoginPanel />
  }
  render() {
    return (
      <HeaderWrapper>
        <Header>
          <FrontPanel>
            <Logo src={LogoImage} alt="" />
            <FeedBack href="mailto:eterlf41@gmail.com">我要反馈</FeedBack>
            <VisitOfficial
              href="javascript:void(0);"
              onClick={this.handleVisitOfficial}
            >
              访问官网
            </VisitOfficial>
          </FrontPanel>
          {this.renderUserPanel()}
        </Header>
      </HeaderWrapper>
    )
  }
}

export default connect(
  state => ({
    me: selectCurrent(state),
  })
)(HeaderComponent)
