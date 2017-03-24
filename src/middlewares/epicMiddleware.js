// @flow
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from 'epic'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default epicMiddleware
