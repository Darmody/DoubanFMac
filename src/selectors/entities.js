// @flow
import { schema as Schema, denormalize } from 'normalizr'
import type { StateShape } from 'constants/types/Redux'

const isModelExists = (entities, model) => entities[model]

export const selectEntities = (state: StateShape, schema: Schema, ids: [] = []) => {
  const model = schema[0].key

  if (isModelExists(state.entities, model)) {
    return denormalize({ [model]: ids }, { [model]: schema }, state.entities)[model]
  }

  return []
}

export const selectEntity = (state: StateShape, schema: Schema, id: number = 0) => {
  const model = schema.key

  if (isModelExists(state.entities, model)) {
    return denormalize({ [model]: id }, { [model]: schema }, state.entities)[model]
  }

  return {}
}
