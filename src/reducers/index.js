// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'constants/types/Redux'
import auth from './auth'

const rootReducer: Reducer = combineReducers({
  auth,
  form: formReducer,
})

export default rootReducer
