import { reducer as formReducer } from 'redux-form';
import signin from './form/signin';

export default formReducer.plugin({
  signin,
});
