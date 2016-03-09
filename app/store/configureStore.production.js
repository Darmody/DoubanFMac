import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';

const router = syncHistory(hashHistory);
const enhancer = applyMiddleware(thunk, router, apiMiddleware);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
