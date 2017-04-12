// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { logined, logout } from 'actions/auth'
import { current } from 'actions/users'
import { rejected, getToken, normalizeResponse } from 'utils/operators'

const loginEpic: Epic = action$ => action$
  .ofType(types.LOGIN_REQUEST)
  .pluck('payload')
  .mergeMap(payload => API
    .authorize(
      payload.username || payload.refreshToken, payload.password
    )
    .pluck('response')
    .map(normalizeResponse())
    .mergeMap(response => Rx$.merge(
      Rx$.of(logined(response)),
      Rx$.of(current(response.access_token)),
    ))
    .catch(rejected(types.LOGIN_FAILURE))
  )

const authEpic: Epic = (action$, store) => action$
  .ofType(types.AUTH_REQUEST)
  .mergeMap(() => API
    .me(getToken(store))()
    .catch(error => Rx$.merge(
      rejected(types.USER_CURRENT_FAILURE)(error),
      Rx$.of(logout()),
    )
  )
)

export default [
  authEpic,
  loginEpic,
]
