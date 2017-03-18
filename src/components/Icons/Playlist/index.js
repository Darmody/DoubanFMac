/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconPlaylist extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Playlist" viewBox="0 0 23 23" height="23" width="23"
      >
        <desc>Icon</desc><g id="icon" fill="none" fillRule="evenodd"><g id="1205_cd-copy" transform="rotate(-90 11.75 8.75)" stroke="#979797"><g id="Layer_1"><g id="Group"><path d="M7.334 15.793v-4.778M10.61 9.688l3.938 3.05" id="Shape"></path><path d="M8.25 15.984a7.724 7.724 0 0 0 6.291-3.234 7.734 7.734 0 1 0-6.291 3.234z" id="Oval"></path><ellipse id="Oval" cx="8.25" cy="8.25" rx="1.017" ry="1.017"></ellipse><circle id="Oval" cx="8.25" cy="8.25" r="2.765"></circle></g></g></g></g>
      </Icon>
    )
  }
}
