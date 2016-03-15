import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Player } from 'components';
import { fetch, like, dislike } from 'reducers/song';
import styles from './Content.scss';

@connect(
  state => ({
    song: state.song,
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, like, dislike }, dispatch)
  })
)
export default class Content extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetch(0);
  }

  nextSong = type => () => {
    this.props.fetch(0, this.props.song.id, type);
  }

  tasteSong = () => {
    if (this.props.song.favorite) {
      this.props.dislike(0, this.props.song.id);
    } else {
      this.props.like(0, this.props.song.id);
    }
  }

  renderFavorite = (favorite, onClick) => {
    return (
      <a href="#" onClick={onClick} >
        <i className={cx('material-icons', { favorite })} > favorite </i>
      </a>
    );
  }

  render() {
    const { song } = this.props;

    return (
      <div className={styles.player} >
        <div>
          <Player
            song={song}
            onEnd={this.nextSong('p')}
          />
          <div className={styles.controlBar}>
            <div className="tasteButtonGroup">
              {this.renderFavorite(song.favorite, this.tasteSong)}
              <a href="#">
                <i className="material-icons" > cancel </i>
              </a>
            </div>
            <div className="controlButtonGroup">
              <a href="#">
                <i className="material-icons" > play_arrow </i>
              </a>
              <a href="#" onClick={this.nextSong()} >
                <i className="material-icons" > skip_next </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
