import { CALL_API } from 'redux-api-middleware';
import _transform from 'lodash/transform';
import _join from 'lodash/join';

export default (actionTypes, channel, lastSongId = 0, type = 's') => {
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

  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: `http://douban.fm/j/v2/playlist?${_join(queryArray, '&')}`,
        method: 'GET',
        credentials: 'include',
        types: actionTypes(dispatch),
      }
    });
  };
};
