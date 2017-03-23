// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'constants/types/Redux'

const rootReducer: Reducer = combineReducers({
  form: formReducer,
})

export default rootReducer
