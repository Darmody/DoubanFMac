import React, { Component } from 'react';
import { Player } from 'components';
import styles from './Favorite.scss';

export default class Favorite extends Component {

  render() {
    return (
      <div className={styles.content} >
        <div className="player">
          <Player
            song={{}}
          />
        </div>
      </div>
    );
  }
}
