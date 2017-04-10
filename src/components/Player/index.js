// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Channel from 'components/Channel'
import Bar from './Bar'

const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 45.975rem;
  margin: 1.75rem auto;
`

type Props = {
  song?: Object,
}

export default class PlayerComponent extends PureComponent {
  static defaultProps = {
    song: {},
  }

  props: Props

  render() {
    return (
      <Player >
        <Channel />
        <Bar />
      </Player>
    )
  }
}
