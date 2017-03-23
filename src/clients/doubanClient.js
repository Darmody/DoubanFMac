// @flow
import config from 'constants/configuration'
import httpClient from './httpClient'

const getAuth = (username, password) => httpClient.post({
  endpoint: 'https://frodo.douban.com/service/auth2/token',
  body: {
    client_id: config.DOUBAN.CLIENT_ID,
    client_secret: config.DOUBAN.CLIENT_SECRET,
    grant_type: 'password',
    username,
    password,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

const refreshAuth = refreshToken => httpClient.post({
  endpoint: 'https://frodo.douban.com/service/auth2/token',
  body: {
    client_id: config.DOUBAN.CLIENT_ID,
    client_secret: config.DOUBAN.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

const authorize = (usernameOrToken: string, password?: string): Promise<*> => {
  if (!password) {
    const token = usernameOrToken
    return refreshAuth(token)
  }

  const username = usernameOrToken
  return getAuth(username, password)
}

const doubanClient = {
  authorize,
}

export default doubanClient
