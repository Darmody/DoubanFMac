import Immutable from 'seamless-immutable'
import * as types from 'constants/types/ActionTypes'
import * as actions from 'actions/auth'
import reducer from 'reducers/auth'

describe('reducer::auth', () => {
  it('initialize state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('存储认证信息', () => {
    const response = {
      accessToken: 'token',
      refreshToken: 'refresh token',
      doubanUserId: 'id',
      expiresIn: 123456,
    }
    expect(
      reducer(Immutable({ loginFailed: false }),
      actions.logined(response)),
    ).toMatchSnapshot()
  })

  it('标记登录失败', () => {
    const state = reducer(undefined, { type: types.LOGIN_FAILURE })
    expect(state).toMatchSnapshot()
    expect(state.loginFailed).toBeTruthy()
  })

  it('登出后重置 state', () => {
    const state = reducer(Immutable({ id: 1 }), { type: types.LOGOUT })
    expect(state).toMatchSnapshot()
    expect(state.id).toBeNull()
  })
})
