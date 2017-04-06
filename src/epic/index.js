// @flow
import { combineEpics } from 'redux-observable'
import auth from './auth'
import users from './users'

export default combineEpics(
  ...auth,
  ...users,
)
