// @flow
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
