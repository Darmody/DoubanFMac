/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconLove extends PureComponent {
  render() {
    const color = this.props.red ? '#FF2C56' : '#4A4A4A';
    return (
      <Icon
        styles={this.props.styles}
        title="Love" viewBox="0 0 30 30" height="26" width="26"
      >
        <desc></desc><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><path d="M22,0 C18.9359565,0 16.5821582,1.72596986 15,3.5 C13.4530656,1.72596986 11.0993172,0 8,0 C3.7559698,0 0,3.9236383 0,9 C0,12.0105248 0.844640658,15.0729547 2.5,18 C6.88109125,25.6681877 15.0243286,28.9632358 15,29 C15.0243286,28.9631844 22.9314319,25.7540044 27.5,18 C29.1765036,15.1251042 30.0352238,12.2324468 30,9 C30.0352238,3.9236383 26.2791541,0 22,0 Z" id="b" fill={color}></path></g>
      </Icon>
    )
  }
}
