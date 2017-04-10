// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import type { Reducer } from 'constants/types/Redux'
import auth from './auth'
import channels from './channels'
import entities from './entities'
import songs from './songs'

const rootReducer: Reducer = combineReducers({
  auth,
  channels,
  entities,
  form: formReducer,
  songs,
})

export default rootReducer
