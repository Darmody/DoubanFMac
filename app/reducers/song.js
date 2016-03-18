import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import _transform from 'lodash/transform';
import _join from 'lodash/join';

export const FETCH_REQUEST = 'SONG/FETCH_REQUEST';
export const FETCH_SUCCESS = 'SONG/FETCH_SUCCESS';
export const FETCH_FAILURE = 'SONG/FETCH_FAILURE';
export const LIKE_REQUEST = 'SONG/LIKE_REQUEST';
export const LIKE_SUCCESS = 'SONG/LIKE_SUCCESS';
export const LIKE_FAILURE = 'SONG/LIKE_FAILURE';
export const DISLIKE_REQUEST = 'SONG/DISLIKE_REQUEST';
export const DISLIKE_SUCCESS = 'SONG/DISLIKE_SUCCESS';
export const DISLIKE_FAILURE = 'SONG/DISLIKE_FAILURE';
export const BAN_REQUEST = 'SONG/BAN_REQUEST';
export const BAN_SUCCESS = 'SONG/BAN_SUCCESS';
export const BAN_FAILURE = 'SONG/BAN_FAILURE';

const initialState = Immutable({
  id: 0,
  name: '',
  source: '',
  cover: '',
  artist: '',
  favorite: false,
  size: 0,
});

export default (state = initialState, action = {}) => {
  let data = {};
  switch (action.type) {
    case FETCH_SUCCESS:
      data = action.payload.song[0];
      return {
        ...state,
        id: data.sid,
        name: data.title,
        source: data.url,
        cover: data.picture,
        artist: data.artist,
        size: data.length,
        favorite: data.like !== 0,
      };
    case LIKE_SUCCESS:
      return {
        ...state,
        favorite: true,
      };
    case DISLIKE_SUCCESS:
      return {
        ...state,
        favorite: false,
      };
    case BAN_SUCCESS:
      data = action.payload.song[0];
      return {
        ...state,
        id: data.sid,
        name: data.title,
        source: data.url,
        cover: data.picture,
        artist: data.artist,
        size: data.length,
        favorite: data.like !== 0,
      };
    default:
      return state;
  }
};

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
