// @flow
import { combineEpics } from 'redux-observable'
import auth from './auth'
import songs from './songs'
import users from './users'

export default combineEpics(
  ...auth,
  ...songs,
  ...users,
)
