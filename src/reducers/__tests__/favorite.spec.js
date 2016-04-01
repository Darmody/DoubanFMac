import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import Immutable from 'seamless-immutable';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from '../../middlewares/apiMiddlewareHook';
import camelizeState from '../../middlewares/camelizeState';
import _last from 'lodash/last';
import _join from 'lodash/join';
import {
  FETCH_ALL_SUCCESS, LIKE_SUCCESS, DISLIKE_SUCCESS, BAN_SUCCESS, BAN_FAILURE, REFUSE,
  PLAY, PAUSE, NEXT, JUMP,
} from '../../actionTypes/favorite';
import favorite, {
  fetchAll, like, dislike, ban, play, pause, next, jump,
} from '../favorite';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Favorite Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  const nockParams = {
    channel: 0, bps: 192, client: 's:mainsite|y:3.0', pb: 128,
    'app_name': 'radio_website', version: 100, sid: 0, type: 's',
  };

  it('FETCH_ALL_SUCCESS', function fetchSuccess(done) {
    nock('http://douban.fm')
      .get('/j/v2/redheart/basic')
      .reply(200, {
        songs: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }]
      });
    nock('http://douban.fm')
      .post('/j/v2/redheart/songs', _join(['bps=192', 'sids=1', 'ck='], '&'))
      .reply(200, [{
        sid: 1,
        title: '浮夸',
        url: 'douban.fm/浮夸',
        picture: 'douban.fm/cover',
        artist: '陈奕迅',
        length: 300,
        favorite: 1,
      }]);

    const store = mockStore({
      song: {
        id: 0, name: '', source: '', cover: '', artist: '',
        favorite: false, size: 0
      },
      playList: [],
    });
    store.dispatch(fetchAll());
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(FETCH_ALL_SUCCESS);
      done();
    }, 20);
  });

  it('LIKE_SUCCESS', function likeSuccess(done) {
    nock('http://douban.fm/')
      .get('/j/v2/playlist')
      .query({ ...nockParams, type: 'r' })
      .reply(200, {
        song: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }]
      });

    const store = mockStore({
      song: {
        id: 0, name: '', source: '', cover: '', artist: '',
        favorite: false, size: 0
      },
      playList: [],
    });
    store.dispatch(like(0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(LIKE_SUCCESS);
      done();
    }, 20);
  });

  it('DISLIKE_SUCCESS', function dislikeSuccess(done) {
    nock('http://douban.fm/')
      .get('/j/v2/playlist')
      .query({ ...nockParams, type: 'u' })
      .reply(200, {
        song: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }]
      });

    const store = mockStore({
      song: {
        id: 0, name: '', source: '', cover: '', artist: '',
        favorite: false, size: 0
      },
      playList: [],
    });
    store.dispatch(dislike(0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(DISLIKE_SUCCESS);
      done();
    }, 20);
  });

  it('BAN_SUCCESS', function banSuccess(done) {
    nock('http://douban.fm/')
      .get('/j/v2/playlist')
      .query({ ...nockParams, type: 'b' })
      .reply(200, {
        song: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }]
      });

    const store = mockStore({
      favorite: {
        song: {
          id: 0, name: '', source: '', cover: '', artist: '',
          favorite: false, size: 0
        },
        playList: [],
      }
    });
    store.dispatch(ban(0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(BAN_SUCCESS);
      done();
    }, 20);
  });

  it('BAN_FAILURE', function banFailure(done) {
    nock('http://douban.fm/')
      .get('/j/v2/playlist')
      .query({ ...nockParams, type: 'b' })
      .reply(200, {
        song: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }]
      });

    const store = mockStore({
      favorite: {
        song: {
          id: 0, name: '', source: '', cover: '', artist: '',
          favorite: false, size: 0
        },
        playList: [],
        loading: true,
      }
    });
    store.dispatch(ban(0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(REFUSE);
      done();
    }, 20);
  });

  it('PLAY', function playSuccess() {
    expect(play()).to.deep.equal({ type: PLAY, payload: undefined });
  });

  it('PAUSE', function pauseSuccess() {
    expect(pause()).to.deep.equal({ type: PAUSE, payload: undefined });
  });

  it('NEXT', function nextSuccess() {
    expect(next(1)).to.deep.equal({ type: NEXT, payload: { lastSongId: 1 } });
  });

  it('JUMP', function jumpSuccess() {
    expect(jump({ id: 1 })).to.deep.equal({ type: JUMP, payload: { song: { id: 1 } } });
  });
});

describe('Favorite Reducers', function reducers() {
  it('FETCH_ALL_SUCCESS', function fetchSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 0, name: '', source: '', cover: '', artist: '',
          favorite: false, size: 0, state: 'disabled',
        },
        playing: false,
        loading: true,
        playList: []
      }), {
        type: FETCH_ALL_SUCCESS,
        payload: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          like: 1,
          status: 0,
        }]
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      },
      playing: true,
      loading: false,
      playList: [{
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      }]
    });
  });

  it('LIKE_SUCCESS', function likeSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: false, state: 'enabled',
        },
        playList: []
      }), {
        type: LIKE_SUCCESS,
        payload: {
          songId: 1,
        }
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      },
      playList: [{
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      }]
    });
  });

  it('DISLIKE_SUCCESS', function dislikeSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        playList: [{
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        }]
      }), {
        type: DISLIKE_SUCCESS,
        payload: { song: [{
          sid: 1,
          title: '浮夸',
          url: 'douban.fm/浮夸',
          picture: 'douban.fm/cover',
          artist: '陈奕迅',
          length: 300,
          favorite: 1,
        }] }
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: false, state: 'enabled',
      },
      playList: []
    });
  });

  it('BAN_SUCCESS', function banSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        playList: [{
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        }],
        playing: false,
        loading: true
      }), {
        type: BAN_SUCCESS,
        payload: { songId: 1 }
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      },
      playList: [],
      playing: true,
      loading: false
    });
  });

  it('BAN_FAILURE', function banFailure() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        playList: [{
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        }],
        playing: true,
        loading: true
      }), {
        type: BAN_FAILURE,
        payload: { songId: 1 }
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      },
      playList: [{
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
      }],
      playing: false,
      loading: false
    });
  });

  it('PLAY', function playSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true,
        },
        playing: false,
      }), {
        type: PLAY
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true
      },
      playing: true,
    });
  });

  it('PAUSE', function pauseSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true,
        },
        playing: true,
      }), {
        type: PAUSE
      })
    ).to.deep.equal({
      song: {
        id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
        artist: '陈奕迅', size: 300, favorite: true
      },
      playing: false,
    });
  });

  it('NEXT', function nextSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        playing: true,
        playList: [
          {
            id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
            artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
          },
          {
            id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
            artist: '忘记了', size: 300, favorite: true, state: 'enabled',
          },
        ]
      }), {
        type: NEXT,
        payload: { lastSongId: 1 }
      })
    ).to.deep.equal({
      song: {
        id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
        artist: '忘记了', size: 300, favorite: true, state: 'enabled',
      },
      playing: true,
      playList: [
        {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        {
          id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
          artist: '忘记了', size: 300, favorite: true, state: 'enabled',
        },
      ]
    });
  });

  it('JUMP', function jumpSuccess() {
    expect(
      favorite(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        playing: true,
        playList: [
          {
            id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
            artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
          },
          {
            id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
            artist: '忘记了', size: 300, favorite: true, state: 'enabled',
          },
        ]
      }), {
        type: JUMP,
        payload: {
          song: {
            id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
            artist: '忘记了', size: 300, favorite: true, state: 'enabled',
          }
        }
      })
    ).to.deep.equal({
      song: {
        id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
        artist: '忘记了', size: 300, favorite: true, state: 'enabled',
      },
      playing: true,
      playList: [
        {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true, state: 'enabled',
        },
        {
          id: 2, name: '一个人的北京', source: 'douban.fm/一个人的北京', cover: 'douban.fm/cover',
          artist: '忘记了', size: 300, favorite: true, state: 'enabled',
        },
      ]
    });
  });
});
