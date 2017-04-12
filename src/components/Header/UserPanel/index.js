// @flow
import React, { PureComponent } from 'react'
import { Observable as Rx$ } from 'rxjs'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { playedList as fetchPlayedList } from 'actions/songs'
import Arrow from 'components/Icons/Arrow'
import DropdownMenu from './DropdownMenu'

const UserPanel = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-bottom: .625rem;

  &:hover {
    .dropdown-menu {
      display: block;
    }
    .icon-arrow {
    transform: rotate(180deg);
    }
  }
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
`

type Props = {
  fetchPlayedList: Function,
  me: Object,
}

class UserPanelComponent extends PureComponent {
  componentDidMount() {
    const element = document.getElementById('user-panel')
    this.panelSubscription = Rx$
      .fromEvent(element, 'mouseover')
      .throttleTime(1000 * 5)
      .subscribe(() => this.props.fetchPlayedList(0, 5))
  }

  componentWillUnmount() {
    if (this.panelSubscription) {
      this.panelSubscription.unsubscribe()
    }
  }

  panelSubscription = undefined
  props: Props

  render() {
    const { me } = this.props

    return (
      <UserPanel id="user-panel">
        <DropdownMenu className="dropdown-menu" />
        <Avatar src={me.icon} alt="" />
        <ListenedWrapper>
          <Listened>已听{me.playedNum}首</Listened>
        </ListenedWrapper>
        <Arrow className="icon-arrow" styles={indicatedArrowCss} />
      </UserPanel>
    )
  }
}

export default connect(
  null,
  { fetchPlayedList },
)(UserPanelComponent)
