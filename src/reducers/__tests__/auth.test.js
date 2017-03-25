import * as actions from 'actions/auth'
import reducer from 'reducers/auth'

describe('reducer::auth', () => {
  it('initialize state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })
  it('存储认证信息', () => {
    const response = {
      access_token: 'token',
      refresh_token: 'refresh token',
      douban_user_id: 'id',
      expires_in: 123456,
    }
    expect(reducer(undefined, actions.logined(response))).toMatchSnapshot()
  })
})
