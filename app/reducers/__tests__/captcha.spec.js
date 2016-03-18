import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from '../middlewares/apiMiddlewareHook';
import camelizeState from '../middlewares/camelizeState';
import _last from 'lodash/last';
import captcha, { FETCH_SUCCESS, fetch } from '../captcha';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Captcha Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  it('FETCH_SUCCESS', function fetchSuccess(done) {
    nock('http://douban.fm/')
      .get('/j/new_captcha')
      .reply(200, 'code');

    const store = mockStore({ code: '' });
    store.dispatch(fetch());
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(FETCH_SUCCESS);
      done();
    }, 100);
  });
});

describe('Captcha Reducers', function reducers() {
  it('FETCH_SUCCESS', function fetchSuccess() {
    expect(captcha({ code: '' }, { type: FETCH_SUCCESS, payload: 'code' }))
      .to.deep.equal({ code: 'code' });
  });
});
