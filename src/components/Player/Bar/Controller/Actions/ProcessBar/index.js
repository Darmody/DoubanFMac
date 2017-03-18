import React, { PureComponent } from 'react'
import styled from 'styled-components'

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
const PlayedBar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0%;
  background-color: rgb(107, 189, 122);
  width: 0%;
  height: 1px;
`
const DownloadedBar = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(196, 196, 196);
  width: 16%;
  height: 1px;
`

export default class ProcessBarContainer extends PureComponent {
  render() {
    return (
      <ProcessBar>
        <DownloadedBar />
        <PlayedBar />
      </ProcessBar>
    )
  }
}
