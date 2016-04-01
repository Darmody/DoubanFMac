import { expect } from 'chai';
import _song from '../song';

describe('Song Module', function module() {
  const list = [
    { id: 0, state: 'enabled' },
    { id: 1, state: 'enabled' },
    { id: 2, state: 'disabled' },
    { id: 3, state: 'enabled' },
    { id: 4, state: 'enabled' },
    { id: 5, state: 'enabled' },
    { id: 6, state: 'disabled' },
    { id: 7, state: 'enabled' },
  ];

  it('of function should return song object', function ofTest() {
    expect(_song.of({
      sid: '1',
      title: '浮夸',
      url: 'http://darmody.me',
      picture: 'http://darmody.me/avatar',
      artist: '陈奕迅',
      length: 100,
    })).to.deep.equal({
      id: '1',
      name: '浮夸',
      source: 'http://darmody.me',
      cover: 'http://darmody.me/avatar',
      artist: '陈奕迅',
      size: 100,
      favorite: false,
      state: 'enabled',
    });
  });

  it('fetchEnabledList function should return enabled list', function fetchEnabledTest() {
    const enabledList = [
      { id: 0, state: 'enabled' },
      { id: 1, state: 'enabled' },
      { id: 3, state: 'enabled' },
      { id: 4, state: 'enabled' },
      { id: 5, state: 'enabled' },
      { id: 7, state: 'enabled' },
    ];
    expect(_song.fetchEnabledList(list)).to.deep.equal(enabledList);
  });

  it('remove function should delete item by it\'s id', function removeTest() {
    const remainList = [
      { id: 1, state: 'enabled' },
      { id: 2, state: 'disabled' },
      { id: 3, state: 'enabled' },
      { id: 4, state: 'enabled' },
      { id: 5, state: 'enabled' },
      { id: 6, state: 'disabled' },
      { id: 7, state: 'enabled' },
    ];
    expect(_song.remove(0, list)).to.deep.equal(remainList);
  });

  it('findIndex function should return index of search item', function findIndexTest() {
    expect(_song.findIndex(4, list)).to.equal(4);
  });

  it('nextIndex function should return next index according to current index', function nextIndexTest() {
    expect(_song.nextIndex(4, list)).to.equal(5);
    expect(_song.nextIndex(7, list)).to.equal(0);
  });
});
