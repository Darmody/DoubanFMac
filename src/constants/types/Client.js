// @flow
import type { Observable } from 'rxjs'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
| 'get' | 'post' | 'put' | 'delete' | 'patch'

export type ClientProps = {
  method: string,
  url: string,
  query?: Object,
  body?: Object,
  headers?: Object,
  responseType?: 'json' | 'text',
  crossDomain?: boolean,
}

export type Client = ClientProps => Observable
