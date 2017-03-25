// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const login = (username: string, password: string): Action => ({
  type: types.LOGIN,
  payload: {
    username,
    password,
  }
})

export const logined = (response: Object): Action => ({
  type: types.LOGINED,
  payload: response,
})
