import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import _transform from 'lodash.transform';
import _join from 'lodash.join';

const FETCH_REQUEST = 'SONG/FETCH_REQUEST';
const FETCH_SUCCESS = 'SONG/FETCH_SUCCESS';
const FETCH_FAILURE = 'SONG/FETCH_FAIL';

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
  switch (action.type) {
    case FETCH_SUCCESS:
      const data = action.payload.song[0];
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

export function fetch(channel, lastSongId = 0, type = 's') {
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
      types: [
        FETCH_REQUEST,
        FETCH_SUCCESS,
        FETCH_FAILURE
      ]
    }
  };
}
