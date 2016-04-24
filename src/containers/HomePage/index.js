import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { connect } from 'react-redux';
import { logout, verify } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import { check } from 'reducers/updater';
import { HomePage } from 'components';

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
export default class HomePageContainer extends Component {
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

  render() {
    return <HomePage {...this.props} />;
  }
}
