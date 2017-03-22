const middlewares = [
]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger').default())
}

export default middlewares
