import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import Immutable from 'seamless-immutable';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import _ from 'ramda';
import apiMiddlewareHook from '../../middlewares/apiMiddlewareHook';
import camelizeState from '../../middlewares/camelizeState';
import { FETCH_REQUEST, FETCH_SUCCESS } from '../../actionTypes/updater';
import updater, { check } from '../updater';

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
      expect(_.last(store.getActions()).type).to.equal(FETCH_SUCCESS);
      done();
    }, 20);
  });
});

describe('Updater Reducers', function reducers() {
  it('FETCH_REQUEST', function fetchRequest() {
    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
        loading: false,
      }), {
        type: FETCH_REQUEST,
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: false,
      loading: true,
    });

    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
        loading: true,
      }), {
        type: FETCH_SUCCESS,
        payload: { tagName: 'v1.0.0' }
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: false,
      loading: false,
    });
  });

  it('FETCH_SUCCESS', function fetchSuccess() {
    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
        loading: true,
      }), {
        type: FETCH_SUCCESS,
        payload: { tagName: 'v1.0.1' }
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: true,
      loading: false,
    });

    expect(
      updater(Immutable({
        currentVersion: '1.0.0',
        outdated: false,
        loading: true,
      }), {
        type: FETCH_SUCCESS,
        payload: { tagName: 'v1.0.0' }
      })
    ).to.deep.equal({
      currentVersion: '1.0.0',
      outdated: false,
      loading: false,
    });
  });
});
