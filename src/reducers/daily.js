import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { createAction, handleActions } from 'redux-actions';
import _ from 'ramda';
import sample from 'lodash.sample';
import _apiMiddleware from '../utils/apiMiddleware';
import _song from '../modules/song';

import {
  FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
  LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE,
  DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE,
  BAN_REQUEST, BAN_SUCCESS, BAN_FAILURE,
  JUMP, NEXT, PLAY, PAUSE
} from '../actionTypes/daily';

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
  [FETCH_REQUEST]: (state) => state.merge({ loading: true, playing: false }),

  [FETCH_SUCCESS]: (state, action) => {
    const playList = _.map(song => _song.of(song), action.payload.songs);
    const song = _.compose(_.or(_.__, state.song), sample, _song.fetchEnabledList)(playList);
    return state.merge({ song, playList, playing: true, loading: false });
  },

  [FETCH_FAILURE]: (state) => state.merge({ loading: false, playing: false }),

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

export function fetch() {
  return {
    [CALL_API]: {
      endpoint: 'http://douban.fm/j/v2/songlist/user_daily?kbs=192',
      method: 'GET',
      credentials: 'include',
      types: [
        FETCH_REQUEST,
        FETCH_SUCCESS,
        FETCH_FAILURE
      ]
    }
  };
}

export const next = createAction(NEXT, lastSongId => ({ lastSongId }));

export function like(songId) {
  const types = () => ([LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE]);
  return _apiMiddleware.fetch(types, 0, songId, 'r');
}

export function dislike(songId) {
  const types = () => ([DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE]);
  return _apiMiddleware.fetch(types, 0, songId, 'u');
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
  return _apiMiddleware.fetch(types, 0, songId, 'b');
}

export const play = createAction(PLAY);

export const pause = createAction(PAUSE);

export const jump = createAction(JUMP, song => ({ song }));
