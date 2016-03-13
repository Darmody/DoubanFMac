import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from 'reducers/middlewares/apiMiddlewareHook';
import camelizeState from 'reducers/middlewares/camelizeState';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const router = syncHistory(hashHistory);
const enhancer = compose(
  applyMiddleware(
    thunk, router, apiMiddlewareHook, apiMiddleware, camelizeState
  ),
  persistState(['auth'], { key: 'douban_sauce.auth' })
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
