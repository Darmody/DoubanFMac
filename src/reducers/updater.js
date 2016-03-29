import Immutable from 'seamless-immutable';
import { CALL_API } from 'redux-api-middleware';
import { handleActions } from 'redux-actions';
import semver from 'semver';
import pkg from '../../package.json';

export const FETCH_REQUEST = 'UPDATER/FETCH_REQUEST';
export const FETCH_SUCCESS = 'UPDATER/FETCH_SUCCESS';
export const FETCH_FAILURE = 'UPDATER/FETCH_FAILURE';

const initialState = Immutable({
  outdated: false,
  currentVersion: pkg.version
});

export default handleActions({
  [FETCH_SUCCESS]: (state, action) => {
    const latestVersion = semver.clean(action.payload.tagName);
    return state.merge({ outdated: semver.gt(latestVersion, state.currentVersion) });
  }
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
