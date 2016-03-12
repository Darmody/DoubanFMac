import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import { routeReducer as routing } from 'react-router-redux';
import form from './form';
import auth from './auth';

const rootReducer = combineReducers({
  routing,
  form,
  modal,
  auth,
});

export default rootReducer;
