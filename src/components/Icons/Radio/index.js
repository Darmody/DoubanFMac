/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconRadio extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Radio" viewBox="0 0 23 23" height="23" width="23"
      >
        <desc>Icon</desc><g id="icon" fill="none" fillRule="evenodd"><g id="924_radio-copy-2" transform="translate(4 -1)"><g id="Layer_1"><g id="Group"><path d="M15 18.815c0 .962-.207 1.185-1.106 1.185H1.106C.21 20 0 19.777 0 18.815v-8.628C0 9.223.21 9 1.106 9h12.788C14.793 9 15 9.223 15 10.187v8.628z" id="Shape" stroke="#979797"></path><ellipse id="Oval" stroke="#979797" cx="8.712" cy="5.644" rx=".36" ry=".36"></ellipse><path d="M2.848 9l5.754-3.31M8.292 3.08a2.251 2.251 0 0 1 2.928 3.04M9.604 11.688a2.839 2.839 0 0 0-1.588 5.193M11.49 12.404a2.839 2.839 0 0 1-1.884 4.963" id="Shape" stroke="#979797"></path></g></g></g></g>
      </Icon>
    )
  }
}
