// @flow
import { Observable as Rx$ } from 'rxjs'
import humps from 'humps'
import { normalize, schema } from 'normalizr'
import { save as saveEntities } from 'actions/entities'

export const normalizeResponse = (response: Object, schema?: schema) => {
  const data = humps.camelizeKeys(response)

  if (schema) {
    return saveEntities(normalize(data, schema).entities)
  }

  return data
}

export const getToken = (store: Object): string => store.getState().auth.token

export const fullfilled = (type: string) => (response?: Object) =>
({ type, payload: response })

export const rejected = (type: string) => () =>
  Rx$.of(({ type, payload: undefined }))
