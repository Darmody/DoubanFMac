// @flow
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import IconSelect from 'components/Icons/Select'
import PlayingIcon from './PlayingIcon'

const Channel = styled.div`
  margin-bottom: 2.45rem;
  display: flex;
  align-items: center;
`

const Name = styled.span`
  margin: 0 .875rem 0 .625rem;
  height: 1.375rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: rgb(47, 152, 66);
`

export default class ChannelComponent extends PureComponent {
  render() {
    return (
      <Channel>
        <PlayingIcon />
        <Name>我的私人 MHz</Name>
        <IconSelect />
      </Channel>
    )
  }
}
