import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Arrow from 'components/Icons/Arrow'
import MeImage from './i.jpg'

const UserPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Avatar = styled.img`
  height: 1.375rem;
  width: 1.375rem;
  border-radius: 50%;
  margin-right: 1rem;
`

const ListenedWrapper = styled.span`
  height: 1.125rem;
  line-height: 1.125rem;
  padding: 0 0.188rem;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  background-color: transparent;
  border: 1px solid rgb(142, 217, 156);
  transform: skew(-10deg);
`

const Listened = styled.span`
  display: inline-block;
  color: rgb(47, 152, 66);
  transform: skew(10deg);
`

const indicatedArrowCss = `
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: rotate(180deg);
  }
`

export default class UserPanelContainer extends PureComponent {
  render() {
    return (
      <UserPanel>
        <Avatar src={MeImage} alt="" />
        <ListenedWrapper>
          <Listened>已听15606首</Listened>
        </ListenedWrapper>
        <Arrow styles={indicatedArrowCss} />
      </UserPanel>
    )
  }
}
