import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { connect } from 'react-redux';
import { logout, verify } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import { check } from 'reducers/updater';
import { shell } from 'electron';
import Navbar from './Navbar/Navbar';
import { Spinner } from 'components';
import styles from './HomePage.scss';
import updaterIcon from './updater.gif';

@connect(
  state => ({
    currentUser: state.auth.user,
    channelSong: state.channel.song,
    favoriteSong: state.favorite.song,
    dailySong: state.daily.song,
    updaterLoading: state.updater.loading,
    outdated: state.updater.outdated,
  }),
  dispatch => ({
    ...bindActionCreators({ show, fetchCaptcha, logout, verify, check }, dispatch)
  })
)
export default class HomePage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    channelSong: PropTypes.object,
    favoriteSong: PropTypes.object,
    dailySong: PropTypes.object,
    updaterLoading: PropTypes.bool,
    outdated: PropTypes.bool.isRequired,
    show: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    check: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    fetchCaptcha: PropTypes.func.isRequired,
  }

  static contextTypes: {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    const updaterInterval = setInterval(() => {
      props.check();
    }, 1000 * 60 * 60 * 24);

    this.state = { updaterInterval, loaded: false };
  }

  componentDidMount() {
    this.props.verify();
    this.props.check();
  }

  componentWillReceiveProps(nextProps) {
    ['channelSong', 'dailySong', 'favoriteSong'].map(song => {
      if (this.props[song].id !== nextProps[song].id) {
        this.notice(nextProps[song]);
      }
    });

    if (this.props.updaterLoading && !nextProps.updaterLoading) {
      this.setState({ loaded: true });
    }
  }

  componentWillUnmount() {
    const { updaterInterval } = this.state;

    if (updaterInterval) {
      clearInterval(updaterInterval);
    }
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
    this.props.show('signin');
  }

  logoutUser = () => {
    this.props.logout();
  }

  downloadLatestVersion = () => {
    shell.openExternal(
      'http://doubanfmac.oss-cn-hangzhou.aliyuncs.com/DoubanFMac.dmg'
    );
  }

  renderUpdateBar = () => {
    return (
      <div className={styles.updaterBar} >
        <button title="有新版本可以更新" onClick={this.downloadLatestVersion} >
          <img src={updaterIcon} className="icon" />
        </button>
      </div>
    );
  }

  render() {
    const { children, currentUser, location, outdated } = this.props;
    const { loaded } = this.state;

    return (
      <Loader loaded={loaded} component={Spinner}>
        <Navbar
          currentLocation={location.pathname}
          currentUser={currentUser}
          showSigninModal={this.showSigninModal}
          logoutUser={this.logoutUser}
        />
        {children}
        <div className={styles.footer} >
          { outdated && this.renderUpdateBar() }
          <div className={styles.contactBar} >
            <a href="mailto:eterlf41@gmail.com" className={styles.link} >问题反馈</a>
          </div>
        </div>
      </Loader>
    );
  }
}
