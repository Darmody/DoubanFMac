// @flow
import { fromJS } from 'immutable'
import { applyMiddleware, createStore, compose } from 'redux'
import persistState from 'redux-localstorage'
import type { StateShape } from 'constants/types/Redux'
import rootReducer from 'reducers'
import middlewares from 'middlewares'

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  persistState('auth', { serialize: fromJS, deserialize: data => data && data.toJS() }),
  window.devToolsExtension ? window.devToolsExtension() : (fn => fn),
)(createStore)

const initialState: StateShape = {}

export default (state: StateShape = initialState) => {
  const store = finalCreateStore(rootReducer, state)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  return store
}
