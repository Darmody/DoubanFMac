// @flow
import qs from 'qs'
import type { Client } from 'constants/types/Client'
import { ajax } from 'rxjs/observable/dom/ajax'
import config from 'constants/configuration'

type Token = string
/**
* 歌曲操作类别
* @type n: 第一次获取播放列表
* @type p: 下一首
* @type e: 标记为已听过
* @type r: 喜欢
* @type u: 取消喜欢
* @type b: 不再播放
*/
type SongActionType = 'n' | 'p' | 'e' | 'r' | 'u' | 'b'

const QUERY = {
  app_name: 'radio_iphone',
  version: 116,
}

const rxClient: Client = ({ query = {}, url, ...restParams }) => ajax({
  responseType: 'json',
  crossDomain: true,
  url: `${url}?${qs.stringify(query)}`,
  ...restParams,
})

type AuthedClient = Token => Client
const authedClient: AuthedClient = token => ({
  headers,
  ...restParams,
}) => {
  if (token) {
    return rxClient({
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      ...restParams,
    })
  }

  return rxClient({ headers, ...restParams })
}

const getAuth = (username, password) => rxClient({
  method: 'POST',
  url: 'https://frodo.douban.com/service/auth2/token',
  body: {
    client_id: config.DOUBAN.CLIENT_ID,
    client_secret: config.DOUBAN.CLIENT_SECRET,
    grant_type: 'password',
    username,
    password,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

const refreshAuth = refreshToken => rxClient({
  method: 'POST',
  url: 'https://frodo.douban.com/service/auth2/token',
  body: {
    client_id: config.DOUBAN.CLIENT_ID,
    client_secret: config.DOUBAN.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export const authorize = (usernameOrToken: string, password?: string) => {
  if (!password) {
    const token = usernameOrToken
    return refreshAuth(token)
  }

  const username = usernameOrToken
  return getAuth(username, password)
}

export const me = (token: Token) => () =>
  authedClient(token)({
    method: 'GET',
    url: 'https://api.douban.com/v2/fm/user_info',
  })

export const songAction = (
  token: Token,
  channel: number,
  type?: SongActionType = 'n',
  sid?: number,
) => authedClient(token)({
  method: 'GET',
  url: 'https://api.douban.com/v2/fm/playlist',
  query: {
    ...QUERY,
    channel,
    kbps: 192,
    pt: 0.0,
    sid,
    type,
    udid: token,
  }
})

export const banSong = (token: Token, payload: {
  channel: number,
  sid: number,
}) => songAction(token, payload.channel, 'b', payload.sid)

export const dislikeSong = (token: Token, payload: {
  channel: number,
  sid: number,
}) => songAction(token, payload.channel, 'u', payload.sid)

export const listenSong = (token: Token, channel: number) =>
  songAction(token, channel, 'n')

export const likeSong = (token: Token, payload: {
  channel: number,
  sid: number,
}) => songAction(token, payload.channel, 'r', payload.sid)

export const markSong = (token: Token, payload: {
  channel: number,
  sid: number,
}) => songAction(token, payload.channel, 'e', payload.sid)

export const nextSong = (token: Token, payload: {
  channel: number,
  sid?: number,
}) => songAction(token, payload.channel, 'p', payload.sid)

export const playedSongList = (token: Token, payload: {
  limit: number,
  start: number,
}) => authedClient(token)({
  method: 'GET',
  url: 'https://api.douban.com/v2/fm/recent_played_tracks',
  query: {
    ...QUERY,
    limit: payload.limit,
    start: payload.start,
    type: 'played',
    udid: token,
  }
})
