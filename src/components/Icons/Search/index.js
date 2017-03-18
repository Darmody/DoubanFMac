/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconSearch extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Search" viewBox="0 0 23 23" height="23" width="23"
      >
        <desc>Icon</desc><g id="icon" fill="none" fillRule="evenodd"><g id="Page-1" transform="matrix(-1 0 0 1 19.469 4)"><path d="M8.004 1.023c-.17 0 .66.007-.51.022a5.685 5.685 0 0 0-3.897 2.048 5.797 5.797 0 0 0-1.321 4.23 5.775 5.775 0 0 0 2.028 3.935 5.669 5.669 0 0 0 4.19 1.334 5.688 5.688 0 0 0 3.897-2.048 5.798 5.798 0 0 0 1.321-4.231 5.778 5.778 0 0 0-2.028-3.934 5.666 5.666 0 0 0-3.68-1.356m-.021 12.614a6.663 6.663 0 0 1-4.33-1.596 6.793 6.793 0 0 1-2.386-4.629 6.817 6.817 0 0 1 1.554-4.976A6.688 6.688 0 0 1 7.405.026a6.663 6.663 0 0 1 4.93 1.57 6.793 6.793 0 0 1 2.386 4.628 6.817 6.817 0 0 1-1.554 4.977 6.69 6.69 0 0 1-5.184 2.436" id="Fill-1" fill="#979797"></path>
        <g id="Group-5" transform="translate(0 11.226)"><mask id="mask-2" fill="white"><path id="path-1" d="M2.134 5.113H0V.173h4.269v4.94H2.134z"></path></mask><path d="M.506 5.113a.504.504 0 0 1-.325-.12.515.515 0 0 1-.063-.72L3.374.356a.503.503 0 0 1 .714-.062.514.514 0 0 1 .062.72L.895 4.93a.505.505 0 0 1-.389.182" id="Fill-3" fill="#979797" mask="url(#mask-2)"></path></g></g></g>
      </Icon>
    )
  }
}
