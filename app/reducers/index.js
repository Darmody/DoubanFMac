import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import { routeReducer as routing } from 'react-router-redux';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  modal,
  auth,
});

export default rootReducer;
