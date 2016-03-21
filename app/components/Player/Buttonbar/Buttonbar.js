import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './Buttonbar.scss';

export default class Buttonbar extends Component {
  static propTypes = {
    onBan: PropTypes.func.isRequired,
    onControl: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onTaste: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    playing: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  renderFavorite = (favorite, onClick) => {
    return (
      <a href="#" onClick={onClick} >
        <i className={cx('material-icons', { favorite })} > favorite </i>
      </a>
    );
  }

  renderPlay = (playing, onClick) => {
    const icon = playing ? 'pause' : 'play_arrow';
    return (
      <a href="#" onClick={onClick} >
        <i className="material-icons" > {icon} </i>
      </a>
    );
  }

  render() {
    const { song, playing } = this.props;

    return (
      <div className={styles.buttonBar}>
        <div className="tasteButtonGroup">
          {this.renderFavorite(song.favorite, this.props.onTaste)}
          <a href="#" onClick={this.props.onBan} >
            <i className="material-icons" > cancel </i>
          </a>
        </div>
        <div className="controlButtonGroup">
          {this.renderPlay(playing, this.props.onControl)}
          <a href="#" onClick={this.props.onNext} >
            <i className="material-icons" > skip_next </i>
          </a>
        </div>
      </div>
    );
  }
}
