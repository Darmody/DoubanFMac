/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconSkip extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Skip" viewBox="0 0 30 30" height="22" width="22"
      >
        <desc>Icon</desc><g id="Page-1" fill="none" fillRule="evenodd"><g id="Fill-1-Copy-8-+-Path-Copy-6-+-Oval-3-Copy-2" fill="#4A4A4A"><path d="M4.722 1.347l18.973 12.148c1.497.828 1.497 2.182 0 3.01L4.722 28.653C3.225 29.48 2 28.778 2 27.09V2.91C2 1.22 3.225.52 4.722 1.346zM25 28.5c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" id="Fill-1-Copy-8"></path><path id="Path-Copy-6" d="M23 4h4v22.5h-4z"></path><path d="M25 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" id="Oval-3-Copy-2"></path></g></g>
      </Icon>
    )
  }
}
