import _ from 'ramda';

function of(data) {
  const stateEnum = ['enabled', 'disabled'];
  const destKeys = ['id', 'name', 'source', 'cover', 'artist', 'size', 'favorite', 'state'];
  const sourceKeys = ['sid', 'title', 'url', 'picture', 'artist', 'length', 'like', 'status'];
  const defaultValues = { like: 0, status: 0 };

  return _.compose(
    _.evolve({ favorite: _.equals(1), state: _.nth(_.__, stateEnum) }),
    _.zipObj(destKeys),
    _.props(sourceKeys),
    _.merge(defaultValues)
  )(data);
}

function fetchEnabledList(list) {
  return _.filter(_.propEq('state', 'enabled'), list);
}

function remove(id, list) {
  return _.reject(_.propEq('id', id), list);
}

function findIndex(id, list) {
  return _.findIndex(_.propEq('id', id), list);
}

function nextIndex(currentIndex, list) {
  return _.compose(_.modulo(_.__, list.length), _.add(list.length), _.add(1))(currentIndex);
}

export default {
  of, fetchEnabledList, remove, findIndex, nextIndex,
};
