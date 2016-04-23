import React from 'react';
import { mapProps } from 'recompose';
import styles from './styles.scss';

const ProcessbarComponent = ({
  playingPercent, loadingPercent,
}) => (
  <div className={styles.processbar} >
    <div className="default" />
    <div className="loading" style={{ width: `${loadingPercent}%` }} />
    <div className="playing" style={{ width: `${playingPercent}%` }} />
  </div>
);

export default mapProps(props => ({
  playingPercent: 100.0 * props.step / props.total,
  loadingPercent: 100.0 * props.buffer / props.total,
}))(ProcessbarComponent);
