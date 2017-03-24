// @flow
import type { Middleware } from 'constants/types/Redux'
import epicMiddleware from './epicMiddleware'

const middlewares: Array<Middleware> = [
  epicMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger').default())
}

export default middlewares
