import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import _ from 'ramda';
import apiMiddlewareHook from '../../middlewares/apiMiddlewareHook';
import camelizeState from '../../middlewares/camelizeState';
import {
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, VERIFY_SUCCESS, VERIFY_FAILURE,
} from '../../actionTypes/auth';
import auth, {
  login, logout, verify,
} from '../auth';
import signForm from '../form/signin';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  it('LOGIN_SUCCESS', function loginSuccess(done) {
    const params = [
      'source=radio',
      'task=sync_channel_list',
      'alias=darmody',
      'form_password=password',
      'captcha_solution=captcha',
      'captcha_id=captchaId'
    ];
    nock('http://douban.fm/')
      .post('/j/login', _.join('&', params))
      .reply(200, {
        user_info: {
          uid: 1,
          name: 'name',
        }
      });

    const store = mockStore({ user: { id: 0 } });
    store.dispatch(login({
      alias: 'darmody', formPassword: 'password',
      captchaSolution: 'captcha', captchaId: 'captchaId'
    }));
    setTimeout(() => {
      expect(_.last(store.getActions()).type).to.equal(LOGIN_SUCCESS);
      done();
    }, 20);
  });

  it('LOGIN_FAILURE', function loginFailure(done) {
    const params = [
      'source=radio',
      'task=sync_channel_list',
      'alias=darmody',
      'form_password=wrongPassword',
      'captcha_solution=captcha',
      'captcha_id=captchaId'
    ];
    nock('http://douban.fm/')
      .post('/j/login', _.join('&', params))
      .reply(200, { err_msg: 'wrong_password' });

    const store = mockStore({ user: { id: 0 } });
    store.dispatch(login({
      alias: 'darmody', formPassword: 'wrongPassword',
      captchaSolution: 'captcha', captchaId: 'captchaId'
    }));
    setTimeout(() => {
      expect(store.getActions()[1].type).to.equal(LOGIN_FAILURE);
      done();
    }, 20);
  });

  it('VERIFY_SUCCESS', function verifySuccess(done) {
    nock('http://douban.fm/')
      .get('/j/v2/user_info')
      .reply(200, {
        user_id: 1,
      });

    const store = mockStore({ user: { id: 0 } });
    store.dispatch(verify());
    setTimeout(() => {
      expect(_.last(store.getActions()).type).to.equal(VERIFY_SUCCESS);
      done();
    }, 20);
  });

  it('VERIFY_FAILURE', function verifyFailure(done) {
    nock('http://douban.fm/')
      .get('/j/v2/user_info')
      .reply(200, { msg: 'need_permission' });

    const store = mockStore({ user: { id: 0 } });
    store.dispatch(verify());
    setTimeout(() => {
      expect(store.getActions()[1].type).to.equal(VERIFY_FAILURE);
      done();
    }, 20);
  });

  it('LOGOUT', function logoutSuccess() {
    expect(logout()).to.deep.equal({ type: LOGOUT, payload: undefined });
  });
});

describe('Auth Reducers', function reducers() {
  it('LOGIN_SUCCESS', function loginSuccess() {
    expect(
      auth({ user: { id: 0 } }, { type: LOGIN_SUCCESS, payload: { uid: 1, name: 'darmody', ck: 'im token' } })
    ).to.deep.equal({ logged: true, user: { id: 1, name: 'darmody', token: 'im token' } });
  });

  it('LOGIN_FAILURE', function loginFailure() {
    expect(
      auth({ user: { id: 0 } }, { type: LOGIN_SUCCESS, payload: null })
    ).to.deep.equal({ user: { id: 0, name: '', token: '' }, logged: false });
    expect(
      signForm({ user: { id: 0 } }, { type: LOGIN_FAILURE, error: 'wrong_password' })._error
    ).to.equal('账号或密码不正确');
  });

  it('VERIFY_SUCCESS', function verifySuccess() {
    expect(
      auth({ user: { id: 1 } }, { type: VERIFY_SUCCESS })
    ).to.deep.equal({ user: { id: 1 } });
  });

  it('VERIFY_FAILURE', function verifyfailure() {
    expect(
      auth({ user: { id: 0 } }, { type: VERIFY_FAILURE })
    ).to.deep.equal({ user: { id: 0, token: '' } });
  });

  it('LOGOUT', function logoutSuccess() {
    expect(
      auth({ user: { id: 1, token: 'im token' } }, { type: LOGOUT })
    ).to.deep.equal({ user: { id: 0, token: '' } });
  });
});
