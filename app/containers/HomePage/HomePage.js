import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { connect } from 'react-redux';
import { logout } from 'reducers/auth';
import { fetch as fetchCaptcha } from 'reducers/captcha';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';

@connect(
  state => ({
    currentUser: state.auth.user,
  }),
  dispatch => ({
    ...bindActionCreators({ show, fetchCaptcha, logout }, dispatch)
  })
)
export default class HomePage extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    show: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    fetchCaptcha: PropTypes.func.isRequired,
  }

  showSigninModal = () => {
    this.props.fetchCaptcha();
    this.props.show('signin');
  }

  logoutUser = () => {
    this.props.logout();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <Navbar
          currentUser={currentUser}
          showSigninModal={this.showSigninModal}
          logoutUser={this.logoutUser}
        />
        <Content />
      </div>
    );
  }
}
