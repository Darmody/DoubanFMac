/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconTrash extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Trash" viewBox="0 0 30 30" height="26" width="26"
      >
        <desc>Icon</desc><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><path d="M19.0000002,2.99518936 L25.5501576,2.99518936 C27.2676993,2.99518936 27.9974555,4.25794694 27.9974555,5.16641446 L27.9974556,7.00000017 L2,7.00000017 L2,5.07556186 C2,4.18983672 2.59870784,2.99518936 4.31630844,2.99518936 L11,2.99518936 L11,1.5 C11,0.5 11.5,0 12.5,0 L17.5,0 C18.5,0 18.9999997,0.5 19,1.5 L19.0000002,2.99518936 Z M4.23383579,27.9351249 C4.2446828,28.8186284 4.84627924,29.9939828 6.54778618,30 L23.4857474,30 C25.1313687,29.9939828 25.8684938,28.8317828 25.9256175,27.9351249 L27.4668952,8 L2.53056032,8 L4.23383579,27.9351249 Z M11,25 C10,25 10,24.5 10,24 L10,13 C10,12.5 10,12 11,12 C12,12 12,12.5 12,13 L12,24 C12,24.5 12,25 11,25 Z M19,25 C18,25 18,24.5 18,24 L18,13 C18,12.5 18,12 19,12 C20,12 20,12.5 20,13 L20,24 C20,24.5 20,25 19,25 Z" fill="#4A4A4A"></path></g>
      </Icon>
    )
  }
}
