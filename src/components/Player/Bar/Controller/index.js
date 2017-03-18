import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Actions from './Actions'

const Controller = styled.div`
  margin-left: 1.375rem;
  width: 26.875rem;
`

const Name = styled.a`
  display: block;
  line-height: 1.28;
  font-size: 1.563rem;
  font-weight: 400;
  color: rgb(3, 3, 3);
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: .5rem;

  &:hover {
    text-decoration: underline;
  }
`
const Artist = styled.a`
  display: block;
  line-height: 1.2;
  font-size: .938rem;
  font-weight: 400;
  color: rgb(74, 74, 74);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default class ControllerContainer extends PureComponent {
  render() {
    return (
      <Controller>
        <Name href="">Say Say</Name>
        <Artist href="">Youngblood Hawke</Artist>
        <Actions />
      </Controller>
    )
  }
}
