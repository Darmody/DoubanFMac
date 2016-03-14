import React, { Component } from 'react';
import Processbar from './Processbar/Processbar';
import styles from './Player.scss';

export default class Player extends Component {
  constructor(props) {
    super(props);

    const self = this;
    const playInterval = setInterval(() => {
      if (self.refs.audio) {
        const audio = self.refs.audio;

        let buffer = 0;
        if (audio.buffered.length > 0) {
          buffer = audio.buffered.end(audio.buffered.length - 1);
        }

        this.setState({
          buffer,
          step: audio.currentTime,
          total: audio.duration,
        });
      }
    }, 1000);

    this.state = { step: 0, buffer: 0, total: 100, playInterval };
  }

  componentWillUnmount() {
    if (this.state.playInterval) clearInterval(this.state.playInterval);
  }


  render() {
    const { step, total, buffer } = this.state;
    return (
      <div className={styles.player}>
        <audio
          ref="audio"
          src="http://mr7.doubanio.com/ef17828dfad6ca8bbaaa31cf764f7445/0/fm/song/p1918067_128k.mp4"
          loop
          autoPlay
        />
        <Processbar total={total} step={step} buffer={buffer} />
      </div>
    );
  }
}
