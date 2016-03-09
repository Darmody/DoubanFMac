import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import {reducer as formReducer} from 'redux-form';
import { routeReducer as routing } from 'react-router-redux';
import auth from './auth';
import doubanCaptcha from './doubanCaptcha';

const rootReducer = combineReducers({
  routing,
  form: formReducer,
  modal,
  auth,
  doubanCaptcha,
});

export default rootReducer;
