import React, { Component } from 'react';
import { Player } from 'components';
import styles from './Content.scss';

export default class Content extends Component {
  render() {
    return (
      <div className={styles.player} >
        <div>
          <span className="channelTitle"> 私人</span>
          <span className="channelSuffix"> MHz</span>
          <div className={styles.songInfoBar} >
            <h2 className="songName"> 一个人的北京 </h2>
            <h4 className="artistName"> 好妹妹乐队 </h4>
          </div>
          <Player />
          <div className={styles.songControlBar} >
            <i className="material-icons controlButton" > favorite </i>
            <i className="material-icons controlButton" > delete </i>
            <i className="material-icons controlButton" > skip_next </i>
          </div>
        </div>
      </div>
    );
  }
}
