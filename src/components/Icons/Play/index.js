/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconPlay extends PureComponent {
  static defaultProps = {
    size: 22,
    color: '#4A4A4A',
  }

  render() {
    const { size, color } = this.props

    return (
      <Icon
        styles={this.props.styles}
        title="Play" viewBox="15 8 10 13" height={size} width={size}
      >
        <desc>Icon</desc><path d="M16.2404248,8.16131117 L24.4883398,13.8012748 C25.1705534,14.1855546 25.1705534,14.8143854 24.4883398,15.1986903 L16.2404248,20.8387042 C15.5581861,21.222984 15,20.8967404 15,20.1136905 L15,8.88632486 C15,8.1032498 15.5581861,7.7770062 16.2404248,8.16131117 Z" stroke="none" fill={color} fillRule="evenodd"></path>
      </Icon>
    )
  }
}
