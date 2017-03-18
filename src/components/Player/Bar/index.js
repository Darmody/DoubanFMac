import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Controller from './Controller'
import CoverImage from './cover.jpg'

const Bar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Cover = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
`

export default class BarContainer extends PureComponent {
  render() {
    return (
      <Bar>
        <Controller />
        <Cover src={CoverImage} />
      </Bar>
    )
  }
}
