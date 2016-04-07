import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import { routeReducer as routing } from 'react-router-redux';
import form from './form';
import auth from './auth';
import captcha from './captcha';
import channel from './channel';
import favorite from './favorite';
import daily from './daily';
import updater from './updater';

const rootReducer = combineReducers({
  routing,
  form,
  modal,
  auth,
  captcha,
  channel,
  favorite,
  daily,
  updater,
});

export default rootReducer;
