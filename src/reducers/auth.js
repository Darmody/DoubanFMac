// @flow
import { Map } from 'immutable'
import * as types from 'constants/types/ActionTypes'
import type { Reducer } from 'constants/types/Redux'

const initialState: Map<string, any> = Map({
  id: undefined,
  token: undefined,
  refreshToken: undefined,
  expiredAt: undefined,
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
