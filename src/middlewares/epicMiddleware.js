// @flow
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from 'epic'
import doubanClient from 'clients/doubanClient'

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: doubanClient,
})

if (module.hot) {
  module.hot.accept('epic', () => {
    const rootEpic = require('epic').default
    epicMiddleware.replaceEpic(rootEpic)
  })
}

export default epicMiddleware
