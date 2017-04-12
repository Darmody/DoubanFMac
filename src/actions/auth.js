// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const login = (username: string, password: string): Action => ({
  type: types.LOGIN_REQUEST,
  payload: {
    username,
    password,
  }
})

export const logout = (): Action => ({
  type: types.LOGOUT,
  payload: undefined,
})

export const logined = (response: Object): Action => ({
  type: types.LOGIN_SUCCESS,
  payload: response,
})
