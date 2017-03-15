/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconArrow extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Title" viewBox="0 0 16 16" height="16" width="16"
      ><desc>Icon</desc><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><polygon id="Triangle-1" fill="#c6c6c6" transform="translate(8.000000, 8.500000) scale(1, -1) translate(-8.000000, -8.500000) " points="8 6 12 11 4 11 "></polygon></g></Icon>
    )
  }
}
