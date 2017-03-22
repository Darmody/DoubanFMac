// @flow

export type Credentials = 'same-origin' | 'include'

export type ClientProp = {
  method: string,
  endpoint: string,
  queryString: Object,
  body: Object,
  headers: Object,
  json: boolean,
  credentials: Credentials,
}
