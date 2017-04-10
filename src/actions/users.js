// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const current = (): Action => ({
  type: types.USER_CURRENT_REQUEST,
  payload: undefined,
})
