import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class Processbar extends Component {
  static propTypes = {
    buffer: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }

  render() {
    const { buffer, step, total } = this.props;
    const playingPercent = 100.0 * step / total;
    const loadingPercent = 100.0 * buffer / total;

    return (
      <div className={styles.processbar} >
        <div className="default" />
        <div className="loading" style={{ width: `${loadingPercent}%` }} />
        <div className="playing" style={{ width: `${playingPercent}%` }} />
      </div>
    );
  }
}
