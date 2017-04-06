// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const save = (data: Object): Action => ({
  type: types.ENTITIES_SAVE,
  payload: data,
})

export const update = (data: Object): Action => ({
  type: types.ENTITIES_UPDATE,
  payload: data,
})
