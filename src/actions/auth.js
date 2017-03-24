// @flow
import { LOGINNED } from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const logined = (username: string, password: string = ''): Action => ({
  type: LOGINNED,
  payload: {
    username,
    password,
  }
})
