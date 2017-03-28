// @flow
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from 'epic'

const epicMiddleware = createEpicMiddleware(rootEpic)

if (module.hot) {
  module.hot.accept('epic', () => {
    const rootEpic = require('epic').default
    epicMiddleware.replaceEpic(rootEpic)
  })
}

export default epicMiddleware
