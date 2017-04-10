// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const save = (data: Object): Action => ({
  type: types.ENTITIES_SAVE,
  payload: data,
})

type Fields = Array<{ field: Array<string | number>, value: any }>
export const update = (fields: Fields): Action => ({
  type: types.ENTITIES_UPDATE,
  payload: fields,
})
