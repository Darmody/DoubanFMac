import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import nock from 'nock';
import Immutable from 'seamless-immutable';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiMiddlewareHook from '../middlewares/apiMiddlewareHook';
import camelizeState from '../middlewares/camelizeState';
import _last from 'lodash/last';
import channel, {
  FETCH_SUCCESS, LIKE_SUCCESS, DISLIKE_SUCCESS, BAN_SUCCESS, PLAY, PAUSE,
  fetch, like, dislike, ban, play, pause,
} from '../channel';

const middlewares = [
  thunk, apiMiddlewareHook, apiMiddleware, camelizeState
];
const mockStore = configureMockStore(middlewares);

describe('Channel Actions', function actions() {
  afterEach(() => {
    nock.cleanAll();
  });

  const nockParams = {
    channel: 0, bps: 192, client: 's:mainsite|y:3.0', pb: 128,
    'app_name': 'radio_website', version: 100, sid: 0, type: 's',
  };

  it('FETCH_SUCCESS', function fetchSuccess(done) {
    nock('http://douban.fm/')
      .get('/j/v2/playlist')
      .query(nockParams)
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
    store.dispatch(fetch(0, 0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(FETCH_SUCCESS);
      done();
    }, 100);
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
    store.dispatch(like(0, 0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(LIKE_SUCCESS);
      done();
    }, 100);
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
    store.dispatch(dislike(0, 0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(DISLIKE_SUCCESS);
      done();
    }, 100);
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
      song: {
        id: 0, name: '', source: '', cover: '', artist: '',
        favorite: false, size: 0
      },
      playList: [],
    });
    store.dispatch(ban(0, 0));
    setTimeout(() => {
      expect(_last(store.getActions()).type).to.equal(BAN_SUCCESS);
      done();
    }, 100);
  });

  it('PLAY', function playSuccess() {
    expect(play()).to.deep.equal({ type: PLAY });
  });

  it('PAUSE', function pauseSuccess() {
    expect(pause()).to.deep.equal({ type: PAUSE });
  });
});

describe('Channel Reducers', function reducers() {
  it('FETCH_SUCCESS', function fetchSuccess() {
    expect(
      channel(Immutable({
        song: {
          id: 0, name: '', source: '', cover: '', artist: '',
          favorite: false, size: 0
        },
        playList: []
      }), {
        type: FETCH_SUCCESS,
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
        artist: '陈奕迅', size: 300, favorite: true
      },
      playList: [{ id: 1, name: '浮夸' }]
    });
  });

  it('LIKE_SUCCESS', function likeSuccess() {
    expect(
      channel(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: false
        }
      }), {
        type: LIKE_SUCCESS,
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
        artist: '陈奕迅', size: 300, favorite: true
      }
    });
  });

  it('DISLIKE_SUCCESS', function dislikeSuccess() {
    expect(
      channel(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true
        }
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
        artist: '陈奕迅', size: 300, favorite: false
      }
    });
  });

  it('BAN_SUCCESS', function banSuccess() {
    expect(
      channel(Immutable({
        song: {
          id: 1, name: '浮夸', source: 'douban.fm/浮夸', cover: 'douban.fm/cover',
          artist: '陈奕迅', size: 300, favorite: true
        }
      }), {
        type: BAN_SUCCESS,
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
        artist: '陈奕迅', size: 300, favorite: true
      }
    });
  });

  it('PLAY', function playSuccess() {
    expect(
      channel(Immutable({
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
      channel(Immutable({
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
});
