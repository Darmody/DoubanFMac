import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'
import {
  Love as IconLove,
  Trash as IconTrash,
  Play as IconPlay,
  Skip as IconSkip,
} from 'components/Icons'

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

const StyledButton = styled.a`
  svg {
    cursor: pointer;
    * {
      cursor: pointer;
    }
  }
`
const Button = props => <StyledButton>{props.children}</StyledButton>
Button.propTypes = {
  children: PropTypes.element.isRequired,
}

export default class ActionBarContainer extends PureComponent {
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
