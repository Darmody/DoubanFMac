import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PlayList from '../PlayList';
import Processbar from './Processbar';
import Buttonbar from './Buttonbar';
import styles from './styles.scss';

export default class Player extends Component {
  static propTypes = {
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    onBan: PropTypes.func.isRequired,
    onControl: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onTaste: PropTypes.func.isRequired,
    onJump: PropTypes.func.isRequired,
  }

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
          step: audio.currentTime || 0,
        });
      }
    }, 1000);

    this.state = { step: 0, buffer: 0, playInterval };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playing && !nextProps.playing) {
      this.refs.audio.pause();
    } else if (!this.props.playing && nextProps.playing) {
      this.refs.audio.play();
    }
  }

  componentWillUnmount() {
    if (this.state.playInterval) clearInterval(this.state.playInterval);
  }

  render() {
    const { step, buffer } = this.state;
    const { song, playList, playing } = this.props;

    const remainTime = 1000.0 * (song.size - step);

    return (
      <div className={styles.player}>
        <PlayList playList={playList} onJump={this.props.onJump} />
        <div className="songCover"
          style={{ backgroundImage: `url(${song.cover})` }}
        />
        <div className="songInfoBar" >
          <h2 className="songNameTitle" > {song.name} </h2>
          <h4 className="artistName"> {song.artist} </h4>
          <span className="songTime">
            -{moment.utc(remainTime).format('mm:ss')}
          </span>
        </div>
        <audio
          ref="audio"
          src={song.source}
          autoPlay
          onEnded={this.props.onEnd}
        />
        <Processbar total={song.size} step={step} buffer={buffer} />
        <Buttonbar {...this.props } playing={playing} />
      </div>
    );
  }
}
