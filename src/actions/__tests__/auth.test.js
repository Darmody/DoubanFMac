import * as actions from '../auth'

describe('action::auth', () => {
  it('创建一个登录 action', () => {
    expect(actions.login('username', 'password')).toMatchSnapshot()
  })

  it('创建一个登录成功的 action', () => {
    expect(actions.logined({ access_token: 'token' })).toMatchSnapshot()
  })
})
