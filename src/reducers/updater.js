import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import semver from 'semver';
import pkg from '../../package.json';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../actionTypes/updater';

const initialState = Immutable({
  outdated: false,
  currentVersion: pkg.version,
  loading: false,
});

export default handleActions({
  [FETCH_REQUEST]: (state) => state.merge({ loading: true }),

  [FETCH_SUCCESS]: (state, action) => {
    const latestVersion = semver.clean(action.payload.tagName);
    return state.merge({
      outdated: semver.gt(latestVersion, state.currentVersion),
      loading: false,
    });
  },

  [FETCH_FAILURE]: (state) => state.merge({ loading: false }),
}, initialState);

export function check() {
  return {
    [CALL_API]: {
      endpoint: 'https://api.github.com/repos/Darmody/DoubanFMac/releases/latest',
      method: 'GET',
      types: [
        FETCH_REQUEST,
        FETCH_SUCCESS,
        FETCH_FAILURE
      ]
    }
  };
}
