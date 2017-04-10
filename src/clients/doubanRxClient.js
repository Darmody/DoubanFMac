// @flow
import qs from 'qs'
import type { Client } from 'constants/types/Client'
import { ajax } from 'rxjs/observable/dom/ajax'
import config from 'constants/configuration'

type Token = string

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
}) => rxClient({
  headers: {
    Authorization: `Bearer ${token}`,
    ...headers,
  },
  ...restParams,
})

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
  type?: 'n' | 'p' | 'e' = 'n',
  sid?: number,
) => authedClient(token)({
  method: 'GET',
  url: 'https://api.douban.com/v2/fm/playlist',
  query: {
    app_name: 'radio_iphone',
    channel,
    kbps: 192,
    pt: 0.0,
    sid,
    type,
    udid: token,
    version: 116,
  }
})

export const listenSong = (token: Token) => (channel: number) =>
  songAction(token, channel, 'n')

export const nextSong = (token: Token) => (payload: {
  channel: number,
  sid?: number,
}) => songAction(token, payload.channel, 'p', payload.sid)

export const markSong = (token: Token) => (payload: {
  channel: number,
  sid: number,
}) => songAction(token, payload.channel, 'e', payload.sid)
