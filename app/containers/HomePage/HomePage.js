import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router';
import Navbar from './Navbar/Navbar';
import styles from './HomePage.scss';

@connect(
  state => ({
    currentUser: state.auth.user,
  }),
  dispatch => bindActionCreators({}, dispatch)
)
export default class HomePage extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <Navbar currentUser={currentUser} />
        <div className={styles.player} >
          <div>
            <span> 私人兆赫 </span>
            <div className={styles.songInfoBar} >
              <h2> 歌名 </h2>
              <h4> 歌手 </h4>
              <span> 剩余时间 </span>
            </div>
            <div className={styles.songProcessBar} >
              ============================
            </div>
            <div className={styles.songControlBar} >
              <a href="#播放"> 播放/暂停 </a>
              <a href="#红心"> 红心 </a>
              <a href="#不再播放"> 不再播放 </a>
              <a href="#下一首"> 下一首 </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
