import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import ipc from 'ipc';
import { connect } from 'react-redux';
import { logout } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import { fetch, like, dislike, ban, play, pause } from 'reducers/song';
import Navbar from './Navbar/Navbar';

@connect(
  state => ({
    currentUser: state.auth.user,
    song: state.song,
  }),
  dispatch => ({
    ...bindActionCreators({
      show, fetchCaptcha, logout, fetch, like, dislike, ban, play, pause
    }, dispatch)
  })
)
export default class HomePage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    currentUser: PropTypes.object,
    song: PropTypes.object,
    show: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    fetchCaptcha: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.handleShortcut();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.song.id !== nextProps.song.id) {
      this.notice(nextProps.song);
    }
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


  notice = (song) => {
    if (document.hasFocus()) return;

    /* eslint no-unused-vars: 0 */
    const notification = new Notification(song.name, {
      body: song.artist,
      icon: song.cover,
    });
  }

  showSigninModal = () => {
    this.props.fetchCaptcha();
    this.props.show('signin');
  }

  logoutUser = () => {
    this.props.logout();
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
    if (this.props.song.playing) {
      this.props.pause();
    } else {
      this.props.play();
    }
  }

  render() {
    const { children, currentUser } = this.props;

    return (
      <div>
        <Navbar
          currentUser={currentUser}
          showSigninModal={this.showSigninModal}
          logoutUser={this.logoutUser}
        />
        {children}
      </div>
    );
  }
}
