// @flow
import R from 'ramda'
import { defaults } from 'utils/ramda'
import qs from 'qs'
import type { Prop } from 'constants/types/Client'

const URLENCODE_TYPE = 'application/x-www-form-urlencoded'
const JSON_TYPE = 'application/json'


const defaultProps = (props: Prop): Prop => defaults(props, {
  method: 'GET',
  endpoint: '',
  queryString: {},
  body: {},
  headers: {},
  json: false,
  credentials: 'same-origin',
})

const normalizeProps = (props: Prop): Prop => ({
  ...props,
  method: (props.method || '').toUpperCase(),
})

const jsonify = (props: Prop): Prop => {
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

const formUrlencode = (props: Prop): Prop => {
  const urlencoded = props.headers && (props.headers['Content-Type'] === URLENCODE_TYPE)

  return {
    ...props,
    body: urlencoded ? qs.stringify(props.body) : props.body,
  }
}

const removeBodyWhenGet = (props: Prop): Prop => {
  const isGet = props.method === 'GET'

  return {
    ...props,
    body: isGet ? undefined : props.body,
  }
}

const httpClient = (props: Prop): Prop => {
  const finalProps = R.compose(
    removeBodyWhenGet,
    formUrlencode,
    jsonify,
    normalizeProps,
    defaultProps,
  )(props)

  const { endpoint, queryString, ...fetchParams } = finalProps
  const url = `${endpoint}?${qs.stringify(queryString)}`

  return window.fetch(url, fetchParams)
}

export default httpClient