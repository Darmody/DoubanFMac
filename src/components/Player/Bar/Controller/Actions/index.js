import React, { PureComponent } from 'react'
import styled from 'styled-components'
import ActionBar from './ActionBar'
import InfoBar from './InfoBar'
import ProcessBar from './ProcessBar'

const Actions = styled.div`
`

export default class ActionsContainer extends PureComponent {
  render() {
    return (
      <Actions>
        <InfoBar />
        <ProcessBar />
        <ActionBar />
      </Actions>
    )
  }
}
