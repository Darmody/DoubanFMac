import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import moment from 'moment';
import Processbar from './Processbar/Processbar';
import Buttonbar from './Buttonbar/Buttonbar';
import styles from './Player.scss';

export default class Player extends Component {
  static propTypes = {
    song: PropTypes.object.isRequired,
    listTitle: PropTypes.string.isRequired,
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

  renderSongName = (index, key) => {
    const renderSong = this.props.playList[index];

    return (
      <div className="songName" key={key} onClick={this.props.onJump(renderSong)} >
        {renderSong.name}
      </div>
    );
  }

  render() {
    const { step, buffer } = this.state;
    const { song, listTitle, playList, playing } = this.props;

    const remainTime = 1000.0 * (song.size - step);

    return (
      <div className={styles.player}>
        <div className="songCover"
          style={{ backgroundImage: `url(${song.cover})` }}
        />
        <div className="songInfoBar" >
          <div className="songNameList">
            <div className="playListTitle">
              <i className="material-icons" > details </i>
              {listTitle}
            </div>
            <div className="playListPanel">
              <ReactList
                itemRenderer={this.renderSongName}
                length={playList.length}
                updateWhenThisValueChanges={playList}
              />
            </div>
          </div>
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
