import Immutable from 'seamless-immutable';
import { handleActions } from 'redux-actions';
import _fetch from '../utils/fetchHelper';

export const FETCH_REQUEST = 'CHANNEL/FETCH_REQUEST';
export const FETCH_SUCCESS = 'CHANNEL/FETCH_SUCCESS';
export const FETCH_FAILURE = 'CHANNEL/FETCH_FAILURE';
export const LIKE_REQUEST = 'CHANNEL/LIKE_REQUEST';
export const LIKE_SUCCESS = 'CHANNEL/LIKE_SUCCESS';
export const LIKE_FAILURE = 'CHANNEL/LIKE_FAILURE';
export const DISLIKE_REQUEST = 'CHANNEL/DISLIKE_REQUEST';
export const DISLIKE_SUCCESS = 'CHANNEL/DISLIKE_SUCCESS';
export const DISLIKE_FAILURE = 'CHANNEL/DISLIKE_FAILURE';
export const BAN_REQUEST = 'CHANNEL/BAN_REQUEST';
export const BAN_SUCCESS = 'CHANNEL/BAN_SUCCESS';
export const BAN_FAILURE = 'CHANNEL/BAN_FAILURE';
export const JUMP = 'CHANNEL/JUMP';
export const PLAY = 'CHANNEL/PLAY';
export const PAUSE = 'CHANNEL/PAUSE';

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
  playList: [],
});

export default handleActions({
  [FETCH_SUCCESS]: (state, action) => {
    const data = action.payload.song[0];
    let playList = Immutable([{
      id: data.sid,
      name: data.title,
      source: data.url,
      cover: data.picture,
      artist: data.artist,
      size: data.length,
      favorite: data.like !== 0,
    }]).concat(state.playList);
    playList = playList.length > 10 ? playList.slice(0, 10) : playList;

    return state.merge({
      song: {
        id: data.sid,
        name: data.title,
        source: data.url,
        cover: data.picture,
        artist: data.artist,
        size: data.length,
        favorite: data.like !== 0,
      },
      playing: true,
      playList
    });
  },
  [LIKE_SUCCESS]: (state) => (state.setIn(['song', 'favorite'], true)),
  [DISLIKE_SUCCESS]: (state) => (state.setIn(['song', 'favorite'], false)),
  [BAN_SUCCESS]: (state, action) => {
    const data = action.payload.song[0];
    return state.merge({
      song: {
        id: data.sid,
        name: data.title,
        source: data.url,
        cover: data.picture,
        artist: data.artist,
        size: data.length,
        favorite: data.like !== 0,
      },
      playing: true,
    });
  },
  [JUMP]: (state, action) => (state.merge({ playing: true, song: action.payload.song })),
  [PLAY]: (state) => (state.set('playing', true)),
  [PAUSE]: (state) => (state.set('playing', false)),
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
