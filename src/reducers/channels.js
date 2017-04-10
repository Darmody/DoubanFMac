// @flow
import Immutable from 'seamless-immutable'
import type { Reducer } from 'constants/types/Redux'

const initialState = Immutable({
  id: 0,
})

const reducer: Reducer = (state = initialState) => state

export default reducer
