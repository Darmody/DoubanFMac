// @flow
import { combineEpics } from 'redux-observable'
import auth from './auth'

export default combineEpics(
  ...auth,
)
