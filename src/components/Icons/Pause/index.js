
/* eslint-disable */
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  ${props => props.styles}
`

export default class IconPause extends PureComponent {
  render() {
    return (
      <Icon
        styles={this.props.styles}
        title="Pause" viewBox="61 0 22 22" height="22" width="22"
      >
          <desc>Icon</desc><path d="M61,1.00246167 C61,0.448817378 61.4509752,0 61.990778,0 L66.009222,0 C66.5564136,0 67,0.43945834 67,1.00246167 L67,20.9975383 C67,21.5511826 66.5490248,22 66.009222,22 L61.990778,22 C61.4435864,22 61,21.5605417 61,20.9975383 L61,1.00246167 Z M77,1.00246167 C77,0.448817378 77.4509752,0 77.990778,0 L82.009222,0 C82.5564136,0 83,0.43945834 83,1.00246167 L83,20.9975383 C83,21.5511826 82.5490248,22 82.009222,22 L77.990778,22 C77.4435864,22 77,21.5605417 77,20.9975383 L77,1.00246167 Z" stroke="none" fill="#4a4a4a" fillRule="evenodd"></path>
      </Icon>
    )
  }
}
