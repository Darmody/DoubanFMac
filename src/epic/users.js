// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { me } from 'clients/doubanRxClient'
import { playlist } from 'actions/songs'
import { normalizeResponse } from 'utils/operators'
import { USER } from 'schemas'

const fetchOperator = store => ({ payload }) => me(
  payload.token || store.getState().auth.token,
)

const persistUserInfo = response => normalizeResponse(response, USER)
const fetchFullfilled = store => response => Rx$.merge(
  Rx$.of(persistUserInfo(response)),
  Rx$.of(playlist(0) || store.getState().auth.token),
)

const current: Epic = (action$, store) => action$
  .ofType(types.USER_CURRENT_REQUEST)
  .mergeMap(fetchOperator(store))
  .pluck('response')
  .mergeMap(fetchFullfilled(store))

export default [
  current
]
