import * as actions from '../auth'

describe('action::auth', () => {
  it('创建一个登录 action', () => {
    expect(actions.login('username', 'password')).toMatchSnapshot()
  })

  it('创建一个登录成功的 action', () => {
    expect(actions.logined({ access_token: 'token' })).toMatchSnapshot()
  })

  it('创建一个登出 action', () => {
    expect(actions.logout()).toMatchSnapshot()
  })

  it('创建一个认证 action', () => {
    expect(actions.auth()).toMatchSnapshot()
  })
})
