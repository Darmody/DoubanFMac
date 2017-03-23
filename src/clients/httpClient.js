// @flow
import R from 'ramda'
import { defaults } from 'utils/ramda'
import qs from 'qs'
import type {
  Client,
  ClientProps,
  RequestProps as Props,
} from 'constants/types/Client'
import verbClient from './verbClient'

const URLENCODE_TYPE = 'application/x-www-form-urlencoded'
const JSON_TYPE = 'application/json'

export const defaultProps = (props: ClientProps): Props => {
  const constructGetprops = endpoint => ({
    method: 'GET',
    endpoint,
    queryString: {},
    body: {},
    headers: {},
    json: false,
    credentials: 'same-origin',
  })
  const constructDefaultProps = props => defaults(props, {
    method: 'GET',
    endpoint: '',
    queryString: {},
    body: {},
    headers: {},
    json: false,
    credentials: 'same-origin',
  })

  const isString = props => R.is(String, props)

  return R.ifElse(isString, constructGetprops, constructDefaultProps)(props)
}

const normalizeProps = (props: Props): Props => ({
  ...props,
  method: (props.method || '').toUpperCase(),
})

const jsonify = (props: Props): Props => {
  const jsonifyOr = props => props.json
  const jsonifyHeaders = props => ({
    ...props.headers,
    'Content-Type': JSON_TYPE,
  })
  const jsonifyBody = props => JSON.stringify(props.body)
  const jsonifyOrHeaders = R.ifElse(jsonifyOr, jsonifyHeaders, R.path(['headers']))
  const jsonifyOrBody = R.ifElse(jsonifyOr, jsonifyBody, R.path(['body']))

  return {
    ...props,
    headers: jsonifyOrHeaders(props),
    body: jsonifyOrBody(props),
  }
}

const formUrlencode = (props: Props): Props => {
  const urlencoded = props.headers && (props.headers['Content-Type'] === URLENCODE_TYPE)

  return {
    ...props,
    body: urlencoded ? qs.stringify(props.body) : props.body,
  }
}

const removeBodyWhenGet = (props: Props): Props => {
  const isGet = props.method === 'GET'

  return {
    ...props,
    body: isGet ? undefined : props.body,
  }
}

const httpClient: Client = (props) => {
  const finalProps = R.compose(
    removeBodyWhenGet,
    formUrlencode,
    jsonify,
    normalizeProps,
    defaultProps,
  )(props)

  const { endpoint, queryString, ...fetchParams } = finalProps
  const url = R.isEmpty(queryString) ?
    endpoint : `${endpoint}?${qs.stringify(queryString)}`

  return window.fetch(url, fetchParams)
}

httpClient.get = verbClient('GET', httpClient)
httpClient.post = verbClient('POST', httpClient)
httpClient.put = verbClient('PUT', httpClient)
httpClient.patch = verbClient('PATCH', httpClient)
httpClient.del = verbClient('DELETE', httpClient)

export default httpClient
