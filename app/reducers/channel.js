import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import _transform from 'lodash/transform';
import _join from 'lodash/join';

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
    let playList = Immutable([{ id: data.sid, name: data.title }]).concat(state.playList);
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
  [PLAY]: (state) => (state.set('playing', true)),
  [PAUSE]: (state) => (state.set('playing', false)),
}, initialState);

const _fetch = (channel, lastSongId = 0, type = 's') => {
  let types = [];

  switch (type) {
    case 's':
    case 'p':
      types = [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE];
      break;
    case 'r':
      types = [LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE];
      break;
    case 'u':
      types = [DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE];
      break;
    case 'b':
      types = [BAN_REQUEST, BAN_SUCCESS, BAN_FAILURE];
      break;
    default:
      types = [];
  }

  const params = {
    channel,
    bps: 192,
    client: 's:mainsite|y:3.0',
    pb: 128,
    'app_name': 'radio_website',
    version: 100,
    sid: lastSongId,
    type,
  };
  const queryArray = _transform(params, (result, value, key) => {
    result.push(`${key}=${value}`);
  }, []);

  return {
    [CALL_API]: {
      endpoint: `http://douban.fm/j/v2/playlist?${_join(queryArray, '&')}`,
      method: 'GET',
      credentials: 'include',
      types,
    }
  };
};

export function fetch(channel, lastSongId, type) {
  return _fetch(channel, lastSongId, type);
}

export function like(channel, SongId) {
  return _fetch(channel, SongId, 'r');
}

export function dislike(channel, SongId) {
  return _fetch(channel, SongId, 'u');
}

export function ban(channel, SongId) {
  return _fetch(channel, SongId, 'b');
}

export function play() {
  return { type: PLAY };
}

export function pause() {
  return { type: PAUSE };
}
