import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Player from 'components/Player'

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1.75rem auto;
`

export default class BodyContainer extends PureComponent {
  render() {
    return (
      <Body>
        <Player />
      </Body>
    )
  }
}
