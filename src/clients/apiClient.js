// @flow
import R from 'ramda'
import type {
  Client,
} from 'constants/types/Client'
import httpClient from './httpClient'
import verbClient from './verbClient'

const apiClient: Client = (props) => {
  if (R.is(String, props)) {
    return httpClient(props)
  }

  return httpClient(R.merge(props, { json: true }))
}

apiClient.get = verbClient('GET', apiClient)
apiClient.post = verbClient('POST', apiClient)
apiClient.put = verbClient('PUT', apiClient)
apiClient.patch = verbClient('PATCH', apiClient)
apiClient.del = verbClient('DELETE', apiClient)

export default apiClient
