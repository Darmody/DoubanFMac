import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import Immutable from 'seamless-immutable';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from '../../middlewares/apiMiddlewareHook';
import camelizeState from '../../middlewares/camelizeState';
import _last from 'lodash/last';
import updater, { FETCH_SUCCESS, check } from '../updater';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Updater Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  it('FETCH_SUCCESS', function fetchSuccess(done) {
    nock('https://api.github.com')
      .get('/repos/Darmody/DoubanFMac/releases/latest')
      .reply(200, { tagName: 'v1.0.0' });

    const store = mockStore({
      updater: {
        currentVersion: '1.0.0'
      }
    });
    store.dispatch(check());
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(FETCH_SUCCESS);
      done();
    }, 20);
  });
});

describe('Updater Reducers', function reducers() {
  it('FETCH_SUCCESS', function fetchSuccess() {
    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
      }), {
        type: FETCH_SUCCESS,
        payload: { tagName: 'v1.0.1' }
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: true,
    });

    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
      }), {
        type: FETCH_SUCCESS,
        payload: { tagName: 'v1.0.0' }
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: false,
    });
  });
});
