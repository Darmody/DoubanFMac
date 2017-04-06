// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const current = (userId: string, token?: string): Action => ({
  type: types.USER_CURRENT_REQUEST,
  payload: {
    userId,
    token,
  }
})
