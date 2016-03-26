import { camelizeKeys } from 'humps';

export default () => next => action => {
  return next({
    ...action,
    payload: camelizeKeys(action.payload)
  });
};
