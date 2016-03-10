import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import apiMiddlewareHook from 'reducers/middlewares/apiMiddlewareHook';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const router = syncHistory(hashHistory);
const logger = createLogger();
const enhancer = applyMiddleware(thunk, router, apiMiddlewareHook, apiMiddleware, logger);

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
