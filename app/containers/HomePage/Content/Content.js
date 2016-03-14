import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Player } from 'components';
import { fetch } from 'reducers/song';
import styles from './Content.scss';

@connect(
  state => ({
    song: state.song,
  }),
  dispatch => ({
    ...bindActionCreators({ fetch }, dispatch)
  })
)
export default class Content extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetch(0);
  }

  next = type => () => {
    this.props.fetch(0, this.props.song.id, type);
  }

  render() {
    const { song } = this.props;

    return (
      <div className={styles.player} >
        <div>
          <Player
            song={song}
            onEnd={this.next('p')}
          />
          <div className={styles.controlBar}>
            <div className="tasteButtonGroup">
              <a href="#">
                <i className="material-icons" > favorite </i>
              </a>
              <a href="#">
                <i className="material-icons" > cancel </i>
              </a>
            </div>
            <div className="controlButtonGroup">
              <a href="#">
                <i className="material-icons" > play_arrow </i>
              </a>
              <a href="#">
                <i className="material-icons" > skip_next </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
