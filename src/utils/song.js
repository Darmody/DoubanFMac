import _ from 'ramda';

export function transform(sourceData) {
  const destKeys = ['id', 'name', 'source', 'cover', 'artist', 'size', 'favorite', 'state'];
  const sourceKeys = ['sid', 'title', 'url', 'picture', 'artist', 'length', 'like', 'status'];
  const defaultValues = { like: 0, status: 0 };
  const stateEnum = ['enabled', 'disabled'];

  return _.compose(
    _.evolve({ favorite: _.equals(1), state: _.nth(_.__, stateEnum) }),
    _.zipObj(destKeys),
    _.props(sourceKeys),
    _.merge(defaultValues)
  )(sourceData);
}

export function getEnabledList(list) {
  return _.filter(_.propEq('state', 'enabled'), list);
}

export function dropById(id, list) {
  return _.reject(_.propEq('id', id), list);
}

export function getIndex(id, list) {
  return _.findIndex(_.propEq('id', id), list);
}

export function nextIndex(currentIndex, list) {
  return _.compose(_.modulo(_.__, list.length), _.add(list.length), _.add(1))(currentIndex);
}
