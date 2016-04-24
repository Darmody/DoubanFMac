import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Daily } from 'components';
import { fetch, next, like, dislike, ban, play, pause, jump } from 'reducers/daily';

@connect(
  state => ({
    currentUser: state.auth.user,
    song: state.daily.song,
    playing: state.daily.playing,
    playList: state.daily.playList,
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, next, play, pause, ban, like, dislike, jump }, dispatch)
  })
)
export default class DailyContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
  }

  render() {
    return <Daily {...this.props} />;
  }
}
