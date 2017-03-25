// @flow
import { LOGIN } from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { logined } from 'actions/auth'
import { fetch$ } from 'utils/observable'

const loginEpic: Epic = (action$, store, { authorize }) =>
  action$.ofType(LOGIN)
    .mergeMap(({ payload }) =>
      fetch$(authorize, payload.username, payload.password)
        .map(response => logined(response))
    )

export default [
  loginEpic
]
