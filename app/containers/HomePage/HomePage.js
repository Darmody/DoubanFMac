import React, { Component } from 'react';
import styles from './HomePage.scss';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <nav className={styles.navbar} >
          <a href="#logo" className={styles.navLogo} > Logo </a>
          <a href="#兆赫" className={styles.navItem} > 兆赫 </a>
          <a href="#歌单" className={styles.navItem} > 歌单 </a>
          <a href="#无宇论" className={styles.profileItem} > 无宇论 </a>
        </nav>
        <div>
          <span> 私人兆赫 </span>
          <div className={styles.songInfoBar}>
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
    );
  }
}
