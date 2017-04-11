// @flow
import { Observable } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { logined } from 'actions/auth'
import { current } from 'actions/users'
import { rejected } from 'utils/operators'

const loginEpic: Epic = action$ => action$
  .ofType(types.LOGIN_REQUEST)
  .pluck('payload')
  .mergeMap(payload => API
    .authorize(
      payload.username || payload.refreshToken, payload.password
    )
    .pluck('response')
    .mergeMap(response => Observable.merge(
      Observable.of(logined(response)),
      Observable.of(current(response.access_token)),
    ))
    .catch(rejected(types.LOGIN_FAILURE))
  )

export default [
  loginEpic
]
