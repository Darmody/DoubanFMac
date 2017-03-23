// @flow
import R from 'ramda'
import type {
  Client,
  ClientProps,
  Method,
} from 'constants/types/Client'
import { defaultProps } from './httpClient'

const verbClient = (method: Method, client: Client) => (props: ClientProps) => R.compose(
  client,
  R.merge(R.__, { method }),
  defaultProps,
)(props)

export default verbClient
