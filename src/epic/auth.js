// @flow
import type { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOGIN } from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { logined } from 'actions/auth'
import config from 'constants/configuration'

const getAuth = (username, password) => ajax({
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
  responseType: 'json',
  crossDomain: true,
})

const refreshAuth = refreshToken => ajax({
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
  responseType: 'json',
  crossDomain: true,
})

const authorize = (usernameOrToken: string, password?: string): Observable => {
  if (!password) {
    const token = usernameOrToken
    return refreshAuth(token)
  }

  const username = usernameOrToken
  return getAuth(username, password)
}

const loginEpic: Epic = (action$) =>
  action$.ofType(LOGIN)
    .mergeMap(({ payload }) =>
      authorize(payload.username || payload.refreshToken, payload.password)
        .map(({ response }) => logined(response))
    )

export default [
  loginEpic
]
