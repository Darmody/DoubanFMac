// @flow

export type Credentials = 'same-origin' | 'include'
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
| 'get' | 'post' | 'put' | 'delete' | 'patch'

export type RequestProps = {
  method?: string,
  endpoint?: string,
  queryString?: Object,
  body?: Object,
  headers?: Object,
  json?: boolean,
  credentials?: Credentials,
}

export type ClientProps = RequestProps | string

export type Client = ClientProps => Promise<*>
