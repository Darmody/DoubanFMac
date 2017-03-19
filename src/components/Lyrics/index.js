import React, { PureComponent } from 'react'
import styled from 'styled-components'

const ipc = require('electron').ipcRenderer

const Lyrics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const LyricsList = styled.div`
  text-align: center;
  padding: 3rem 0;
  height: 25.813rem;
  overflow: scroll;
`

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 9.375rem;
`

const CloseLyrics = styled.a`
  color: #8f8e94;
  font-size: .813rem;
  font-weight: 400;
  line-height: 1.75rem;
  text-decoration: none;
  cursor: pointer;
`

const Line = styled.p`
  color: #8f8e94;
  font-size: .813rem;
  font-weight: 400;
  line-height: 1.75rem;
  min-height: 1rem;
  user-select: text;
  cursor: text;
`

export default class LyricsContainer extends PureComponent {
  handleClose = () => {
    ipc.send('lyricsWindow', 'close')
  }

  render() {
    return (
      <Lyrics>
        <LyricsList>
          <Line>Pick apart</Line>
          <Line>The pieces of your heart</Line>
          <Line>And let me peer inside</Line>
          <Line>Let me in</Line>
          <Line>Where only your thoughts have been</Line>
          <Line>Let me occupy your mind</Line>
          <Line>As you do mine</Line>
          <Line>Your heart’s a mess</Line>
          <Line>You won’t admit to it</Line>
          <Line>It makes no sense</Line>
          <Line>But I’m desperate to connect</Line>
          <Line>And you, you can’t live like this</Line>
          <Line>You have lost</Line>
          <Line>Too much love</Line>
          <Line>To fear, doubt and distrust</Line>
          <Line>(It’s not enough)</Line>
          <Line>You just threw away the key</Line>
          <Line>To your heart</Line>
          <Line>You don’t get burned</Line>
          <Line>(’Cause nothing gets through)</Line>
          <Line>It makes it easier</Line>
          <Line>(Easier on you)</Line>
          <Line>But that much more difficult for me</Line>
          <Line>To make you see…</Line>
          <Line>Love ain’t fair</Line>
          <Line>So there you are</Line>
          <Line>My love</Line>
          <Line>Your heart’s a mess</Line>
          <Line>You won’t admit to it</Line>
          <Line>It makes no sense</Line>
          <Line>But I’m desperate to connect</Line>
          <Line>And you, you can’t live like this</Line>
          <Line>Love ain’t safe</Line>
          <Line>You won’t get hurt if you stay chaste</Line>
          <Line>So you can wait</Line>
          <Line>But I don’t wanna waste my love</Line>
        </LyricsList>
        <Action>
          <CloseLyrics
            href="javascript:void(0);"
            onClick={this.handleClose}
          >
            关闭歌词
          </CloseLyrics>
        </Action>
      </Lyrics>
    )
  }
}
