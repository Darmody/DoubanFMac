import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Favorite } from 'components';
import { fetchAll, next, like, dislike, ban, play, pause, jump } from 'reducers/favorite';

@connect(
  state => ({
    currentUser: state.auth.user,
    song: state.favorite.song,
    playing: state.favorite.playing,
    playList: state.favorite.playList,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchAll, next, play, pause, ban, like, dislike, jump }, dispatch)
  })
)
export default class FavoriteContainer extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    fetchAll: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
  }

  render() {
    return <Favorite {...this.props} />;
  }
}
