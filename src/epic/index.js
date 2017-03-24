// @flow
import { combineEpics } from 'redux-observable'
import fake from './fake'

export default combineEpics(
  ...fake,
)
