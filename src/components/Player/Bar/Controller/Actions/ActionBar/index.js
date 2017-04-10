// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Love as IconLove,
  Trash as IconTrash,
  Play as IconPlay,
  Skip as IconSkip,
} from 'components/Icons'
import { like, dislike } from 'actions/songs'
import { selectCurrent } from 'selectors/songs'
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

type Props = {
  like: Function,
  dislike: Function,
  song: Object,
}

class ActionBarComponent extends PureComponent {
  props: Props

  isLike = () => this.props.song.like !== 0

  handleFavorite = () => {
    const { song, like, dislike } = this.props

    if (this.isLike()) {
      dislike(0, song.sid)
    } else {
      like(0, song.sid)
    }
  }

  render() {
    return (
      <ActionBar>
        <Head>
          <Button onClick={this.handleFavorite}>
            <IconLove red={this.isLike()} />
          </Button>
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

export default connect(
  state => ({
    song: selectCurrent(state) || {},
  }),
  { like, dislike, },
)(ActionBarComponent)
