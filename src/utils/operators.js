// @flow
import { Observable as Rx$ } from 'rxjs'
import humps from 'humps'
import { normalize, schema } from 'normalizr'

export const normalizeResponse = (schema?: schema) => (response: Object) => {
  const data = humps.camelizeKeys(response)

  if (schema) {
    return normalize(data, schema)
  }

  return data
}

export const getToken = (store: Object): string => store.getState().auth.token

export const fullfilled = (type: string) => (response?: Object) =>
({ type, payload: response })

export const rejected = (type: string) => () =>
  Rx$.of(({ type, payload: undefined }))
