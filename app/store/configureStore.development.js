import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import apiMiddlewareHook from 'reducers/middlewares/apiMiddlewareHook';
import camelizeState from 'reducers/middlewares/camelizeState';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const router = syncHistory(hashHistory);
const logger = createLogger();
const enhancer = compose(
  applyMiddleware(
    thunk, router, apiMiddlewareHook, apiMiddleware, camelizeState, logger
  ),
  persistState(['auth'], { key: 'douban_sauce.auth' })
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  router.listenForReplays(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}
