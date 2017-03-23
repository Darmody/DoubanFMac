// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  &:not(:last-child) {
    margin-right: 1.563rem;
  }

  svg {
    cursor: pointer;
    * {
      cursor: pointer;
    }
  }
`

type Props = {
  onClick?: Function,
  children?: any,
}

export default class Link extends PureComponent {
  static defaultProps = {
    onClick: fn => fn,
    children: null,
  }

  props: Props

  render() {
    const { onClick, children } = this.props
    return (
      <StyledLink
        href="javascript:void(0);"
        onClick={onClick}
      >
        {children}
      </StyledLink>
    )
  }
}
