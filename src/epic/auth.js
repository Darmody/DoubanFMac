// @flow
import { LOGIN } from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { logined } from 'actions/auth'

const loginEpic: Epic = (action$, store, { authorize }) =>
  action$.ofType(LOGIN)
    .mergeMap(({ payload }) =>
      authorize(payload.username, payload.password)
        .map(response => response.json())
        .map(response => logined(response))
    )

export default [
  loginEpic
]
