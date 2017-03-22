// @flow
import type { Middleware } from 'constants/types/Redux'

const middlewares: Array<Middleware> = [
]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger').default())
}

export default middlewares
