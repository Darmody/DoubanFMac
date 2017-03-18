/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconLyrics extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Lyrics" viewBox="0 0 20 20" height="20" width="20"
      >
        <desc>Icon</desc><g id="icon" fill="none" fillRule="evenodd"><g id="ci" fill="#B9B9B9"><path d="M2 7.5c0-.276.229-.5.5-.5h11c.276 0 .5.232.5.5 0 .276-.229.5-.5.5h-11a.505.505 0 0 1-.5-.5zm1 3c0-.276.215-.5.498-.5h4.004c.275 0 .498.232.498.5 0 .276-.215.5-.498.5H3.498A.504.504 0 0 1 3 10.5zm0 3c0-.276.215-.5.498-.5h4.004c.275 0 .498.232.498.5 0 .276-.215.5-.498.5H3.498A.504.504 0 0 1 3 13.5zm-1 3c0-.276.233-.5.503-.5h5.994c.278 0 .503.232.503.5 0 .276-.233.5-.503.5H2.503A.507.507 0 0 1 2 16.5zm1-12c0-.276.215-.5.498-.5h4.004c.275 0 .498.232.498.5 0 .276-.215.5-.498.5H3.498A.504.504 0 0 1 3 4.5zM9.5 4c-.303 0-.5.255-.5.5s.197.5.5.5H16v11l-3.5.044c-.328 0-.5.15-.5.456 0 .308.172.5.5.5H16c.497 0 1-.5 1-1V5c0-.5-.505-1-1-1H9.5zm4.5 6.604a.601.601 0 0 0-.596-.604H9.597a.602.602 0 0 0-.597.604v2.791c0 .333.269.605.597.605h3.807a.602.602 0 0 0 .596-.605v-2.79zM10 11h3v2h-3v-2z" id="Combined-Shape"></path></g></g>
      </Icon>
    )
  }
}
