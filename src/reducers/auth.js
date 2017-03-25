// @flow
import Immutable from 'seamless-immutable'
import * as types from 'constants/types/ActionTypes'
import type { Reducer } from 'constants/types/Redux'

const initialState = Immutable({
  id: null,
  token: '',
  refreshToken: '',
  expiredAt: null,
})

const reducer: Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGINED: return state.merge({
      token: payload.access_token,
      refreshToken: payload.refresh_token,
      id: payload.douban_user_id,
      expiredAt: payload.expires_in,
    })
    default: return state
  }
}

export default reducer
