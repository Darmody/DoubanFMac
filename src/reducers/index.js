// @flow
import { combineReducers } from 'redux'
import type { Reducer } from 'constants/types/Redux'
import fake from './fake'

const rootReducer: Reducer = combineReducers({
  fake,
})

export default rootReducer
