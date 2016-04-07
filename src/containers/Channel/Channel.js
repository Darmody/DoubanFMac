import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Player } from 'components';
import { fetch, like, dislike, ban, play, pause, jump } from 'reducers/channel';
import { shortcut } from 'utils';
import styles from './Channel.scss';

@connect(
  (state, { params }) => ({
    song: state.channel.song,
    playList: state.channel.playList,
    playing: state.channel.playing,
    channelId: params.id || '0',
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, like, dislike, ban, play, pause, jump }, dispatch)
  })
)
export default class Channel extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    channelId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    const { channelId } = this.props;
    const shortcutListener = shortcut.listen(
      channelId, this.onTaste, this.onControl, this.onBan, this.onNext()
    );

    this.state = { shortcutListener };
  }

  componentDidMount() {
    this.props.fetch(this.props.channelId);
  }

  componentWillUnmount() {
    shortcut.stop(this.state.shortcutListener);
  }

  onNext = type => () => {
    this.props.fetch(this.props.channelId, this.props.song.id, type);
  }

  onBan = () => {
    this.props.ban(this.props.channelId, this.props.song.id);
  }

  onControl = () => {
    if (this.props.playing) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  onTaste = (action) => {
    if (action === 'like') {
      this.props.like(this.props.channelId, this.props.song.id);
    } else if (action === 'dislike') {
      this.props.dislike(this.props.channelId, this.props.song.id);
    } else if (this.props.song.favorite) {
      this.props.dislike(this.props.channelId, this.props.song.id);
    } else {
      this.props.like(this.props.channelId, this.props.song.id);
    }
  }

  onJump = (song) => () => {
    this.props.jump(song);
  }

  render() {
    const { song, playList, playing } = this.props;

    return (
      <div className={styles.content}>
        <Player
          song={song}
          playList={playList}
          playing={playing}
          onEnd={this.onNext('p')}
          onBan={this.onBan}
          onControl={this.onControl}
          onNext={this.onNext()}
          onTaste={this.onTaste}
          onJump={this.onJump}
        />
      </div>
    );
  }
}
