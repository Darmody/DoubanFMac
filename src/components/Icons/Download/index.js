/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconDownload extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Download" viewBox="0 0 20 20" height="20" width="20"
      >
        <desc>Download</desc><g id="icon" fill="none" fillRule="evenodd"><g id="download" fill="#B9B9B9"><g id="Group-16"><path d="M12 14H1.845C1.378 14 1 14.447 1 15c0 .553.378 1 .845 1H12v-2z" id="Combined-Shape"></path><path d="M18.405 7h-4.812c-.32 0-.593.258-.593.56v8.88c0 .302.274.56.593.56h4.812c.32 0 .593-.258.593-.56V7.56c0-.302-.274-.56-.593-.56zm-.806 8.5h-3.09c-.291 0-.51-.26-.51-.561v-5.43c0-.303.219-.562.473-.509h3.054c.254-.053.472.206.472.508v5.43c0 .303-.145.562-.4.562z" id="Shape" transform="matrix(1 0 0 -1 0 24)"></path><path d="M7 10.9v-8c0-.497.449-.9 1-.9.552 0 1 .403 1 .9v8c0 .498-.448.901-1 .901-.551 0-1-.403-1-.901z" id="Fill-36"></path><path d="M12 8.298l-4 2.805L2.375 7.16a.88.88 0 0 0-1.213.197.84.84 0 0 0 .2 1.186l6.131 4.298a.884.884 0 0 0 1.013 0L12 10.39V8.299z" id="Combined-Shape"></path></g></g></g>
      </Icon>
    )
  }
}
