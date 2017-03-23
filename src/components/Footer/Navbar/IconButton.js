// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin: 2.5rem;
  line-height: 1.375rem;
  height: 1.375rem;
  text-decoration: none;
  font-size: .875rem;
  color: #75747b;

  svg {
    cursor: pointer;
    margin-right: .5rem;
    * {
      cursor: pointer;
    }
  }
`

type Props = {
  children?: any,
}


export default class IconButton extends PureComponent {
  static defaultProps = {
    children: null,
  }

  props: Props

  render() {
    return (
      <StyledLink href="javascript:void(0);">{this.props.children}</StyledLink>
    )
  }
}
