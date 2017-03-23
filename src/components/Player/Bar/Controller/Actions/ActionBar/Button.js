// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  svg {
    cursor: pointer;
    * {
      cursor: pointer;
    }
  }
`

type Props = {
  children?: any,
}

export default class Button extends PureComponent {
  static defaultProps = {
    children: null,
  }

  props: Props

  render() {
    return (
      <StyledButton>{this.props.children}</StyledButton>
    )
  }
}
