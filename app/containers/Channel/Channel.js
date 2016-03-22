import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Player } from 'components';
import { fetch, like, dislike, ban, play, pause } from 'reducers/song';
import { shortcut } from 'utils';
import styles from './Channel.scss';

@connect(
  (state, { params }) => ({
    song: state.song,
    channelId: params.id || '0',
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, like, dislike, ban, play, pause }, dispatch)
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
    song: PropTypes.object.isRequired,
    channelId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    const { channelId, song, like, dislike } = this.props;
    const shortcutListener = shortcut.listen(
      channelId, song, like, dislike, this.controlSong, this.banSong, this.nextSong()
    );

    this.state = { shortcutListener };
  }

  componentDidMount() {
    this.props.fetch(this.props.channelId);
  }

  componentWillUnmount() {
    shortcut.stop(this.state.shortcutListener);
  }

  nextSong = type => () => {
    this.props.fetch(this.props.channelId, this.props.song.id, type);
  }

  banSong = () => {
    this.props.ban(this.props.channelId, this.props.song.id);
  }

  controlSong = () => {
    if (this.props.song.playing) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  tasteSong = () => {
    if (this.props.song.favorite) {
      this.props.dislike(this.props.channelId, this.props.song.id);
    } else {
      this.props.like(this.props.channelId, this.props.song.id);
    }
  }

  render() {
    const { song } = this.props;

    return (
      <div className={styles.player}>
        <Player
          song={song}
          onEnd={this.nextSong('p')}
          onBan={this.banSong}
          onControl={this.controlSong}
          onNext={this.nextSong()}
          onTaste={this.tasteSong}
        />
      </div>
    );
  }
}
