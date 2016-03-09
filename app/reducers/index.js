import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import { routeReducer as routing } from 'react-router-redux';
import auth from './auth';
import doubanCaptcha from './doubanCaptcha';

const rootReducer = combineReducers({
  routing,
  modal,
  auth,
  doubanCaptcha,
});

export default rootReducer;
