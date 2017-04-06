// @flow
import { Observable } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { authorize } from 'clients/doubanRxClient'
import { logined } from 'actions/auth'
import { current } from 'actions/users'

const login = ({ payload }) => authorize(
  payload.username || payload.refreshToken, payload.password
)

const dispatchPersistAndFetch = response => Observable.merge(
  Observable.of(logined(response)),
  Observable.of(current(response.access_token)),
)

const loginEpic: Epic = action$ => action$
  .ofType(types.LOGIN_REQUEST)
  .mergeMap(login)
  .pluck('response')
  .mergeMap(dispatchPersistAndFetch)

export default [
  loginEpic
]
