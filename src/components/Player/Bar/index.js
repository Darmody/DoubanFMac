// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectCurrent } from 'selectors/songs'
import { next, mark } from 'actions/songs'
import Controller from './Controller'

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

type Props = {
  song: Object,
  next: Function,
  mark: Function,
}

class BarComponent extends PureComponent {
  props: Props

  render() {
    const { song, next, mark } = this.props
    return (
      <Bar>
        <Controller song={song} next={next} mark={mark} />
        <Cover src={song.picture} />
      </Bar>
    )
  }
}

export default connect(
  state => ({
    song: selectCurrent(state) || {},
  }),
  { next, mark },
)(BarComponent)
