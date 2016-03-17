import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from '../middlewares/apiMiddlewareHook';
import camelizeState from '../middlewares/camelizeState';
import _last from 'lodash.last';
import _join from 'lodash.join';
import auth, { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, login, logout } from '../auth';
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
      .post('/j/login', _join(params, '&'))
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
      expect(_last(store.getActions()).type).to.equal(LOGIN_SUCCESS);
      done();
    }, 100);
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
      .post('/j/login', _join(params, '&'))
      .reply(200, { err_msg: 'wrong_password' });

    const store = mockStore({ user: { id: 0 } });
    store.dispatch(login({
      alias: 'darmody', formPassword: 'wrongPassword',
      captchaSolution: 'captcha', captchaId: 'captchaId'
    }));
    setTimeout(() => {
      expect(store.getActions()[1].type).to.equal(LOGIN_FAILURE);
      done();
    }, 100);
  });

  it('LOGOUT', function logoutSuccess() {
    expect(logout()).to.deep.equal({ type: LOGOUT });
  });
});

describe('Auth Reducers', function reducers() {
  it('LOGIN_SUCCESS', function loginSuccess() {
    expect(
      auth({ user: { id: 0 } }, { type: LOGIN_SUCCESS, payload: { uid: 1, name: 'darmody' } })
    ).to.deep.equal({ logged: true, user: { id: 1, name: 'darmody' } });
  });

  it('LOGIN_FAILURE', function loginFailure() {
    expect(
      signForm({ user: { id: 0 } }, { type: LOGIN_FAILURE, error: 'wrong_password' })._error
    ).to.equal('账号或密码不正确');
  });
});
