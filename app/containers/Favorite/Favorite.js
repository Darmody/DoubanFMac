import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Player } from 'components';
import { fetchAll, next, like, dislike, ban, play, pause, jump } from 'reducers/favorite';
import { shortcut } from 'utils';
import styles from './Favorite.scss';

@connect(
  state => ({
    currentUser: state.auth.user,
    song: state.favorite.song,
    playing: state.favorite.playing,
    playList: state.favorite.playList,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchAll, next, play, pause, ban, like, dislike, jump }, dispatch)
  })
)
export default class Favorite extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    fetchAll: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const shortcutListener = shortcut.listen(
      0, this.tasteSong, this.onControl, this.onBan, this.onNext
    );

    this.state = { shortcutListener };
  }

  componentDidMount() {
    this.props.fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser.id === 0 && nextProps.currentUser.id !== 0) {
      this.props.fetchAll();
    }
  }

  componentWillUnmount() {
    shortcut.stop(this.state.shortcutListener);
  }

  onNext = () => {
    this.props.next(this.props.song.id);
  }

  onControl = () => {
    if (this.props.playing) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  onTaste = (action) => {
    if (action === 'dislike') {
      this.props.dislike(this.props.song.id);
    } else if (action === 'like') {
      this.props.like(this.props.song.id);
    }

    if (this.props.song.favorite) {
      this.props.dislike(this.props.song.id);
    } else {
      this.props.like(this.props.song.id);
    }
  }

  onBan = () => {
    this.props.ban(this.props.song.id);
  }

  onJump = (song) => () => {
    this.props.jump(song);
  }

  renderContent = (props) => {
    const { playing, currentUser, song, playList } = props;
    const available = currentUser.id !== 0 && song.id !== 0;

    if (available) {
      return (
        <div className={styles.content} >
          <div className="player">
            <Player
              song={song}
              playList={playList}
              playing={playing}
              onControl={this.onControl}
              onTaste={this.onTaste}
              onBan={this.onBan}
              onNext={this.onNext}
              onEnd={this.onNext}
              onJump={this.onJump}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={styles.mask} >
        <i className="material-icons" > announcement </i>
        Oops, 还没有红心歌曲，是不是忘记登录了？
      </div>
    );
  }

  render() {
    return this.renderContent(this.props);
  }
}
