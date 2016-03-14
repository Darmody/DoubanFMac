import React, { Component, PropTypes } from 'react';
import styles from './Processbar.scss';

export default class Processbar extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }

  render() {
    const { step, total } = this.props;
    const percent = 100.0 * step / total;

    return (
      <div className={styles.processbar} >
        <div className="default" >
          <div className="playing" style={{ width: `${percent}%` }} />
        </div>
      </div>
    );
  }
}
