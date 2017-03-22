// @flow

export type Credentials = 'same-origin' | 'include'

export type Prop = {
  method: string,
  endpoint: string,
  queryString: Object,
  body: Object,
  headers: Object,
  json: boolean,
  credentials: Credentials,
}
