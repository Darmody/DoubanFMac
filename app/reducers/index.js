import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  auth,
});

export default rootReducer;
