// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {
  Love as IconLove,
  Trash as IconTrash,
  Play as IconPlay,
  Skip as IconSkip,
} from 'components/Icons'
import Button from './Button'

const ActionBar = styled.div`
  margin-top: 3.688rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Head = styled.div`
  display: inline-block;

  a:not(:last-child) {
    margin-right: 2rem;
  }
`

const Tail = styled.div`
  display: inline-block;

  a:not(:last-child) {
    margin-right: 3.75rem;
  }
`

export default class ActionBarComponent extends PureComponent {
  render() {
    return (
      <ActionBar>
        <Head>
          <Button><IconLove /></Button>
          <Button><IconTrash /></Button>
        </Head>
        <Tail>
          <Button><IconPlay /></Button>
          <Button><IconSkip /></Button>
        </Tail>
      </ActionBar>
    )
  }
}
