// @flow
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectCurrent as selectCurrentSong } from 'selectors/songs'

const ProcessBar = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #dadada;
  -webkit-transition-property: width;
  transition-property: width;
`
const PlayingBar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0%;
  background-color: rgb(107, 189, 122);
  width: ${props => props.percent}%;
  height: 1px;
`
const BufferingBar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(196, 196, 196);
  width: ${props => props.percent}%;
  height: 1px;
`

type Props = {
  step: number,
  buffer: number,
  total: number,
}

class ProcessBarComponent extends PureComponent {
  props: Props

  calcPercent = (current, total) => {
    const value = 100.0 * (current / total)

    return value > 100 ? 100 : value
  }

  playingPercent = () => {
    if (this.props.total > 0) {
      return this.calcPercent(this.props.step, this.props.total)
    }

    return 0
  }

  bufferingPercent = () => {
    if (this.props.total > 0) {
      return this.calcPercent(this.props.buffer, this.props.total)
    }

    return 0
  }

  render() {

    return (
      <ProcessBar>
        <BufferingBar percent={this.bufferingPercent()} />
        <PlayingBar percent={this.playingPercent()} />
      </ProcessBar>
    )
  }
}

export default connect(
  state => ({
    total: (selectCurrentSong(state) || {}).length || 1,
  })
)(ProcessBarComponent)
