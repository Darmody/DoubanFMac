// @flow
import Immutable from 'seamless-immutable'
import * as types from 'constants/types/ActionTypes'
import type { Reducer } from 'constants/types/Redux'

const initialState = Immutable({
  id: undefined,
})

const reducer: Reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.SONG_CURRENT: return state.merge({
      id: payload.sid,
    })
    default: return state
  }
}

export default reducer
