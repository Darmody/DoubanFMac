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
  onClick?: Function,
}

export default class Button extends PureComponent {
  static defaultProps = {
    children: null,
    onClick: fn => fn,
  }

  props: Props

  render() {
    return (
      <StyledButton onClick={this.props.onClick}>{this.props.children}</StyledButton>
    )
  }
}
