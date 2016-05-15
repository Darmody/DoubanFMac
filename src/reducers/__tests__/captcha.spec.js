import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import _ from 'ramda';
import apiMiddlewareHook from '../../middlewares/apiMiddlewareHook';
import camelizeState from '../../middlewares/camelizeState';
import { FETCH_SUCCESS } from '../../actionTypes/captcha';
import captcha, { fetch } from '../captcha';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Captcha Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  it('FETCH_SUCCESS', function fetchSuccess(done) {
    nock('https://douban.fm/')
      .get('/j/new_captcha')
      .reply(200, 'code');

    const store = mockStore({ code: '' });
    store.dispatch(fetch());
    setTimeout(() => {
      expect(_.last(store.getActions()).type).to.equal(FETCH_SUCCESS);
      done();
    }, 20);
  });
});

describe('Captcha Reducers', function reducers() {
  it('FETCH_SUCCESS', function fetchSuccess() {
    expect(captcha({ code: '' }, { type: FETCH_SUCCESS, payload: 'code' }))
      .to.deep.equal({ code: 'code' });
  });
});
