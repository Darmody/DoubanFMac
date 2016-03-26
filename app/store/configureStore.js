import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from 'middlewares/apiMiddlewareHook';
import camelizeState from 'middlewares/camelizeState';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';
import config from '../../config';

const router = syncHistory(hashHistory);

const middlewares = [
  thunk, router, apiMiddlewareHook, apiMiddleware, camelizeState
];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  persistState(['auth'], { key: config.persistAuthKey })
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (process.env.NODE_ENV === 'development') {
    router.listenForReplays(store);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers'))
      );
    }
  }

  return store;
}
