// @flow
import R from 'ramda'
import Immutable from 'seamless-immutable'
import * as types from 'constants/types/ActionTypes'
import type { Reducer } from 'constants/types/Redux'

const initialState = Immutable({
})

const reducer: Reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case types.ENTITIES_SAVE: {
      let finalState = state
      R.forEachObjIndexed((data, model) =>
        R.forEachObjIndexed((value, id) => {
          finalState = Immutable.setIn(finalState, [model, id], value)
        })(data || {})
      )(payload)
      return finalState
    }
    case types.ENTITIES_UPDATE: {
      let finalState = state
      const updateField = ({ field, value }) => {
        finalState = Immutable.setIn(state, field, value)
      }

      R.forEach(updateField, payload)

      return finalState
    }
    default: return state
  }
}

export default reducer
