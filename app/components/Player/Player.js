import React, { Component } from 'react';
import Processbar from './Processbar/Processbar';
import styles from './Player.scss';

export default class Player extends Component {
  render() {
    return (
      <div className={styles.player}>
        <Processbar total={100} step={40} />
      </div>
    );
  }
}
