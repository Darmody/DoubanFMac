import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import { routeReducer as routing } from 'react-router-redux';
import form from './form';
import auth from './auth';
import captcha from './captcha';
import song from './song';

const rootReducer = combineReducers({
  routing,
  form,
  modal,
  auth,
  captcha,
  song,
});

export default rootReducer;
