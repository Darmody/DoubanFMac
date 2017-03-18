/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconDownload extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Download" viewBox="0 0 20 20" height="20" width="20"
      >
          <desc>Download</desc><g id="icon" fill="none" fillRule="evenodd"><g id="addition" fill="#B9B9B9"><path d="M9 9H4.007C3.45 9 3 9.448 3 10c0 .556.45 1 1.007 1H9v4.993C9 16.55 9.448 17 10 17c.556 0 1-.45 1-1.007V11h4.993C16.55 11 17 10.552 17 10c0-.556-.45-1-1.007-1H11V4.007C11 3.45 10.552 3 10 3c-.556 0-1 .45-1 1.007V9z" id="Rectangle-51"></path></g></g>
      </Icon>
    )
  }
}
