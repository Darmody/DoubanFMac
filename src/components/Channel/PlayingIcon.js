import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.span`
`

const stretching = keyframes`
  0% {
    height: .75rem;
  }

  50% {
    height: .125rem;
  }
  100% {
    height: .75rem;
  }
`

const Volume = styled.div`
  display: inline-block;
  background: rgb(92, 188, 125);
  height: .75rem;
  width: .125rem;
  margin-right: .063rem;
  border-radius: 25%;
  animation: ${stretching} ${props => `${props.duration}s`} infinite ease;
`

export default class PlayingIconContainer extends PureComponent {
  render() {
    return (
      <Container>
        <Volume duration={2} />
        <Volume duration={1.8} />
        <Volume duration={1} />
        <Volume duration={1.5} />
      </Container>
    )
  }
}
