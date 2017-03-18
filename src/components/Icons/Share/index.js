/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconShare extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Download" viewBox="0 0 20 20" height="20" width="20"
      >
          <desc>Download</desc><g id="icon" fill="none" fillRule="evenodd"><g id="share" fill="#B9B9B9"><path d="M12.69 13.145L7.94 10.31A2.06 2.06 0 0 0 8 9.83a2.06 2.06 0 0 0-.06-.478l4.7-2.81a1.96 1.96 0 0 0 1.36.553c1.103 0 2-.918 2-2.048S15.103 3 14 3s-2 .918-2 2.048c0 .164.023.324.06.478l-4.7 2.81A1.96 1.96 0 0 0 6 7.783c-1.103 0-2 .918-2 2.048s.897 2.048 2 2.048a1.96 1.96 0 0 0 1.36-.553l4.75 2.837a1.977 1.977 0 0 0-.053.447c0 1.099.87 1.99 1.943 1.99s1.943-.891 1.943-1.99c0-1.1-.87-1.99-1.943-1.99a1.91 1.91 0 0 0-1.31.525z" id="Shape-3"></path></g></g>
      </Icon>
    )
  }
}
