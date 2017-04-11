import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Volume as IconVolume } from 'components/Icons'

const VolumeController = styled.span`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  &:hover {
    .volume-slider {
      margin-right: 0;
    }
  }
`

const VolumeSlider = styled.div`
  display: inline-flex;
  align-items: center;
  width: 3.438rem;
  height: .938rem;
  margin-right: -3.438rem;
  transition: all .3s linear;
  padding-left: .188rem;
`

const sliderBarWidth = 3.125
const SliderBarContainer = styled.div`
  width: ${sliderBarWidth}rem;
  height: .125rem;
  background-color: rgb(229, 229, 232);
  cursor: pointer;

  * {
    cursor: pointer;
  }
`

const VolumeIconContainer = styled.a`
  cursor: pointer;

  * {
    cursor: pointer;
  }
`

// TODO: 貌似 styled-components 有 bug
const sliderBarStyle = {
  backgroundColor: 'rgb(151, 151, 151)',
  height: '.125rem',
  width: `${sliderBarWidth}rem`,
}

type Props = {
  setVolume: Function,
  toggleMuted: Function,
  volume: number,
}

export default class VolumeControllerComponent extends PureComponent {
  setVolumeSliderRef = ref => { this.volumeSlider = ref }

  props: Props

  volumeIconCount = () => this.props.volume * 4

  handleVolumeClick = event => {
    const total = sliderBarWidth * 16 // rem to pixel
    const current = event.pageX - event.target.getBoundingClientRect().left

    this.props.setVolume(current / total)
  }

  render() {
    return (
      <VolumeController>
        <VolumeIconContainer
          href="javascript:void(0);"
          onClick={this.props.toggleMuted}
        >
          <IconVolume count={this.volumeIconCount()} />
        </VolumeIconContainer>
        <VolumeSlider
          className="volume-slider"
          ref={this.setVolumeSliderRef}
        >
          <SliderBarContainer onClick={this.handleVolumeClick}>
            <div
              style={{
                ...sliderBarStyle,
                width: `${this.props.volume * sliderBarWidth}rem`,
              }}
            />
          </SliderBarContainer>
        </VolumeSlider>
      </VolumeController>
    )
  }
}
