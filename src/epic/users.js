// @flow
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { me } from 'clients/doubanRxClient'
import { normalizeResponse } from 'utils/operators'
import { USER } from 'schemas'

const fetchOperator = store => ({ payload }) => me(
  payload.token || store.getState().auth.token,
)

const persistUserInfo = response => normalizeResponse(response, USER)

const fetchEpic: Epic = (action$, store) => action$
  .ofType(types.USER_CURRENT_REQUEST)
  .mergeMap(fetchOperator(store))
  .pluck('response')
  .map(persistUserInfo)

export default [
  fetchEpic
]
