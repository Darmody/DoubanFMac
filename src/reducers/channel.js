import Immutable from 'seamless-immutable';
import { handleActions } from 'redux-actions';
import _fetch from '../utils/fetchHelper';
import _song from '../modules/song';
import _ from 'ramda';

import {
  FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
  LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE,
  DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE,
  BAN_REQUEST, BAN_SUCCESS, BAN_FAILURE,
  JUMP, PLAY, PAUSE
} from '../actionTypes/channel';

const initialState = Immutable({
  song: {
    id: 0,
    name: '',
    source: '',
    cover: '',
    artist: '',
    favorite: false,
    size: 0,
  },
  playing: true,
  loading: false,
  playList: [],
});

export default handleActions({
  [FETCH_REQUEST]: (state) => state.merge({ playing: false, loading: true }),

  [FETCH_SUCCESS]: (state, action) => {
    const song = _song.of(action.payload.song[0]);
    const playList = _.slice(0, 10)(_.prepend(song, state.playList));
    return state.merge({ song, playing: true, loading: false, playList });
  },

  [FETCH_FAILURE]: (state) => (state.merge({ playing: false, loading: false })),

  [LIKE_SUCCESS]: (state) => (state.setIn(['song', 'favorite'], true)),

  [DISLIKE_SUCCESS]: (state) => (state.setIn(['song', 'favorite'], false)),

  [BAN_REQUEST]: (state) => state.merge({ playing: false, loading: true }),

  [BAN_SUCCESS]: (state, action) => {
    return state.merge({
      song: _song.of(action.payload.song[0]),
      playing: true,
      loading: false,
    });
  },
  [BAN_FAILURE]: (state) => (state.merge({ playing: false, loading: false })),

  [JUMP]: (state, action) => (state.merge({ playing: true, song: action.payload.song })),

  [PLAY]: (state) => state.set('playing', true),

  [PAUSE]: (state) => state.set('playing', false),

}, initialState);

export function fetch(channel, lastSongId, type) {
  const types = () => ([FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE]);
  return _fetch(types, channel, lastSongId, type);
}

export function like(channel, songId) {
  const types = () => ([LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE]);
  return _fetch(types, channel, songId, 'r');
}

export function dislike(channel, songId) {
  const types = () => ([DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE]);
  return _fetch(types, channel, songId, 'u');
}

export function ban(channel, songId) {
  const types = () => ([BAN_REQUEST, BAN_SUCCESS, BAN_FAILURE]);
  return _fetch(types, channel, songId, 'b');
}

export function jump(song) {
  return {
    type: JUMP,
    payload: { song }
  };
}

export function play() {
  return { type: PLAY };
}

export function pause() {
  return { type: PAUSE };
}
