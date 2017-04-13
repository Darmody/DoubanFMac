// @flow
import Immutable from 'seamless-immutable'
import * as types from 'constants/types/ActionTypes'
import type { Reducer } from 'constants/types/Redux'

const initialState = Immutable({
  id: null,
  token: '',
  refreshToken: '',
  expiredAt: null,
  loginFailed: false,
})

const reducer: Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS: return Immutable.merge(state, {
      token: payload.accessToken,
      refreshToken: payload.refreshToken,
      id: payload.doubanUserId,
      expiredAt: payload.expiresIn,
      loginFailed: false,
    })
    case types.LOGIN_FAILURE: return Immutable.merge(state, { loginFailed: true })
    case types.LOGOUT: return Immutable.merge(state, initialState)
    default: return state
  }
}

export default reducer
