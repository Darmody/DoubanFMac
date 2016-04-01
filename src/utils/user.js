import _ from 'ramda';

export function transform(sourceData) {
  const destKeys = ['id', 'name', 'token'];
  const sourceKeys = ['uid', 'name', 'ck'];
  const defaultValues = { uid: 0, name: '', ck: '' };

  return _.compose(
    _.zipObj(destKeys),
    _.props(sourceKeys),
    _.merge(defaultValues)
  )(sourceData);
}
