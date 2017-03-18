/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconHollowLove extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="HollowLove" viewBox="0 0 23 23" height="23" width="23"
      >
        <desc>Icon</desc><g id="icon" fill="none" fillRule="evenodd"><path d="M15 5c-1.532 0-2.71.863-3.5 1.75C10.726 5.863 9.55 5 8 5 5.878 5 4 6.962 4 9.5c0 1.505.422 3.036 1.25 4.5 2.19 3.834 6.262 5.481 6.25 5.5-.012.018 3.965-1.623 6.25-5.5.838-1.438 1.267-2.884 1.25-4.5.017-2.538-1.86-4.5-4-4.5z" id="Imported-Layers-Copy-5" stroke="#979797"></path></g>
      </Icon>
    )
  }
}
