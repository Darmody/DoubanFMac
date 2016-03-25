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
    const title = favorite ? '取消喜欢' : '喜欢';

    return (
      <button onClick={onClick} title={title} >
        <i className={cx('material-icons', { favorite })} > favorite </i>
      </button>
    );
  }

  renderPlay = (playing, onClick) => {
    const icon = playing ? 'pause' : 'play_arrow';
    const title = playing ? '暂停' : '播放';

    return (
      <button onClick={onClick} title={title}>
        <i className="material-icons" > {icon} </i>
      </button>
    );
  }

  render() {
    const { song, playing } = this.props;

    return (
      <div className={styles.buttonBar}>
        <div className="tasteButtonGroup">
          {this.renderFavorite(song.favorite, this.props.onTaste)}
          <button onClick={this.props.onBan} title="不再播放" >
            <i className="material-icons" > cancel </i>
          </button>
        </div>
        <div className="controlButtonGroup">
          {this.renderPlay(playing, this.props.onControl)}
          <button onClick={this.props.onNext} title="下一首" >
            <i className="material-icons" > skip_next </i>
          </button>
        </div>
      </div>
    );
  }
}
