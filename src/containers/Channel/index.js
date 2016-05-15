import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Channel } from 'components';
import { fetch, like, dislike, ban, play, pause, jump } from 'reducers/channel';

@connect(
  (state, { params }) => ({
    song: state.channel.song,
    playList: state.channel.playList,
    playing: state.channel.playing,
    channelId: params.id || '0',
  }),
  dispatch => ({
    ...bindActionCreators({ fetch, like, dislike, ban, play, pause, jump }, dispatch)
  })
)
export default class ChannelContainer extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    ban: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    playList: PropTypes.array.isRequired,
    playing: PropTypes.bool.isRequired,
    channelId: PropTypes.string.isRequired,
  }

  render() {
    return <Channel {...this.props} />;
  }
}
