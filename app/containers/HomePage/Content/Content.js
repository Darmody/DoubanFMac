import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { connect } from 'react-redux';
import ipc from 'ipc';
import notifier from 'node-notifier';
import { Player } from 'components';
import { fetch, like, dislike, ban } from 'reducers/song';
import styles from './Content.scss';

@connect(
  state => ({
    song: state.song,
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, like, dislike, ban }, dispatch)
  })
)
export default class Content extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { playing: true };
    this.handleShortcut();
  }

  componentDidMount() {
    this.props.fetch(0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.song.id !== nextProps.song.id) {
      this.notice(nextProps.song);
    }
  }

  notice = (song) => {
    if (document.hasFocus()) return;

    notifier.notify({
      title: song.name,
      message: song.artist,
      contentImage: song.cover,
      sender: 'com.electron.doubanfmac',
      sound: 'Pop',
    });
  }

  handleShortcut = () => {
    ipc.on('shortcut-pressed', (event) => {
      switch (event) {
        case 'controlSong':
          return this.controlSong();
        case 'likeSong':
          return this.props.like(0, this.props.song.id);
        case 'dislikeSong':
          return this.props.dislike(0, this.props.song.id);
        case 'banSong':
          return this.banSong();
        case 'nextSong':
          return this.nextSong()();
        default:
          return '';
      }
    });
  }

  nextSong = type => () => {
    this.props.fetch(0, this.props.song.id, type);
  }

  banSong = () => {
    this.props.ban(0, this.props.song.id);
  }

  tasteSong = () => {
    if (this.props.song.favorite) {
      this.props.dislike(0, this.props.song.id);
    } else {
      this.props.like(0, this.props.song.id);
    }
  }

  controlSong = () => {
    this.setState({ playing: !this.state.playing });
  }

  renderFavorite = (favorite, onClick) => {
    return (
      <a href="#" onClick={onClick} >
        <i className={cx('material-icons', { favorite })} > favorite </i>
      </a>
    );
  }

  renderPlay = (playing, onClick) => {
    const icon = playing ? 'pause' : 'play_arrow';
    return (
      <a href="#" onClick={onClick} >
        <i className="material-icons" > {icon} </i>
      </a>
    );
  }

  render() {
    const { song } = this.props;
    const { playing } = this.state;

    return (
      <div className={styles.player} >
        <div>
          <Player
            song={song}
            playing={playing}
            onEnd={this.nextSong('p')}
          />
          <div className={styles.controlBar}>
            <div className="tasteButtonGroup">
              {this.renderFavorite(song.favorite, this.tasteSong)}
              <a href="#" onClick={this.banSong} >
                <i className="material-icons" > cancel </i>
              </a>
            </div>
            <div className="controlButtonGroup">
              {this.renderPlay(playing, this.controlSong)}
              <a href="#" onClick={this.nextSong()} >
                <i className="material-icons" > skip_next </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
