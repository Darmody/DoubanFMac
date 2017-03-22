import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from 'reducers'
import middlewares from 'middlewares'

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : (fn => fn),
)(createStore)

const initialState = {}

export default (state = initialState) => {
  const store = finalCreateStore(rootReducer, state)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  return store
}
