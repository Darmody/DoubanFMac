// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { shell } from 'electron'
import Navbar from './Navbar'

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  margin: 0 auto;
`

const Ad = styled.p`
  width: 100%;
  text-align: center;
`

const Purchase = styled.a`
  font-size: .75rem;
  font-weight: normal;
  text-align: center;
  color: rgb(151, 126, 66);
  text-decoration: none;
  cursor: pointer;
`

export default class FooterComponent extends PureComponent {
  handlePurchase = () => shell.openExternal('https://douban.fm/upgrade')

  render() {
    return (
      <Footer>
        <Navbar />
        <Ad>
          <Purchase href="javascript:void(0);" onClick={this.handlePurchase}>
            一键购买豆瓣FM PRO，高音质无广告 ➝
          </Purchase>
        </Ad>
      </Footer>
    )
  }
}
