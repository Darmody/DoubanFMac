import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import _ from 'ramda';
import sample from 'lodash.sample';
import _fetch from '../utils/fetchHelper';
import _song from '../modules/song';
import config from '../../config';

import {
  FETCH_ALL_REQUEST, FETCH_ALL_RELAY, FETCH_ALL_SUCCESS, FETCH_ALL_FAILURE,
  LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE,
  DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE,
  BAN_REQUEST, BAN_SUCCESS, BAN_FAILURE,
  JUMP, NEXT, PLAY, PAUSE
} from '../actionTypes/favorite';

const initialState = Immutable({
  song: {
    id: 0,
    name: '',
    source: '',
    cover: '',
    artist: '',
    favorite: false,
    state: 'disabled',
    size: 0,
  },

  playing: true,
  playList: [],
});

export default handleActions({
  [FETCH_ALL_REQUEST]: (state) => state.merge({ loading: true, playing: false }),

  [FETCH_ALL_SUCCESS]: (state, action) => {
    const playList = _.map(song => _song.of(_.merge({ like: 1 }, song)), action.payload);
    const song = _.compose(_.or(_.__, state.song), sample, _song.fetchEnabledList)(playList);
    return state.merge({ song, playList, playing: true, loading: false });
  },

  [FETCH_ALL_FAILURE]: (state) => state.merge({ loading: false, playing: false }),

  [NEXT]: (state, action) => {
    const { lastSongId } = action.payload;
    const { playList } = state;
    const enabledList = _song.fetchEnabledList(playList);
    const lastIndex = _song.findIndex(lastSongId, playList);
    const currentIndex = _song.nextIndex(lastIndex, enabledList);
    return state.merge({ song: enabledList[currentIndex], playing: true });
  },

  [LIKE_SUCCESS]: (state) => {
    const nextState = state.setIn(['song', 'favorite'], true);
    return nextState.set('playList', state.playList.concat(nextState.song));
  },

  [DISLIKE_SUCCESS]: (state) => {
    const nextState = state.setIn(['song', 'favorite'], false);
    return nextState.set('playList', _song.remove(state.song.id, state.playList));
  },

  [BAN_REQUEST]: (state) => state.merge({ playing: false, loading: true }),

  [BAN_SUCCESS]: (state, action) => {
    return state.merge({
      playList: _song.remove(action.payload.songId, state.playList),
      playing: true,
      loading: false,
    });
  },

  [BAN_FAILURE]: (state) => state.merge({ playing: false, loading: false }),

  [JUMP]: (state, action) => (state.merge({ playing: true, song: action.payload.song })),

  [PLAY]: (state) => (state.set('playing', true)),

  [PAUSE]: (state) => (state.set('playing', false)),
}, initialState);

function _fetchAll(ids) {
  const localStorage = window.localStorage;
  const authKey = config.persistAuthKey;
  const token = _.compose(
    _.pathOr('', ['auth', 'user', 'token']), JSON.parse, _.propOr('{}', authKey),
  )(localStorage);
  const body = { bps: 192, sids: _.join('|', ids), ck: token };
  return {
    [CALL_API]: {
      endpoint: 'http://douban.fm/j/v2/redheart/songs',
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'include',
      types: [
        FETCH_ALL_REQUEST,
        FETCH_ALL_SUCCESS,
        FETCH_ALL_FAILURE
      ]
    }
  };
}

export function fetchAll() {
  return dispatch => {

    dispatch({
      [CALL_API]: {
        endpoint: 'http://douban.fm/j/v2/redheart/basic',
        method: 'GET',
        credentials: 'include',
        types: [
          FETCH_ALL_REQUEST,
          {
            type: FETCH_ALL_RELAY,
            payload: (_action, state, res) => {
              return res.json().then(json => {
                dispatch(_fetchAll(json.songs.map((song) => (song.sid)) || []));
                return json;
              });
            }
          },
          FETCH_ALL_FAILURE
        ]
      }
    });
  };
}

export function next(lastSongId) {
  return {
    type: NEXT,
    payload: { lastSongId }
  };
}

export function like(songId) {
  const types = () => ([LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE]);
  return _fetch(types, 0, songId, 'r');
}

export function dislike(songId) {
  const types = () => ([DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE]);
  return _fetch(types, 0, songId, 'u');
}

export function ban(songId) {
  const types = (dispatch) => ([
    BAN_REQUEST,
    {
      type: BAN_SUCCESS,
      payload: (_action, state, res) => {
        return res.json().then(() => {
          dispatch(next(songId));
          return { songId };
        });
      }
    },
    BAN_FAILURE
  ]);
  return _fetch(types, 0, songId, 'b');
}

export function play() {
  return { type: PLAY };
}

export function pause() {
  return { type: PAUSE };
}

export function jump(song) {
  return {
    type: JUMP,
    payload: { song }
  };
}
