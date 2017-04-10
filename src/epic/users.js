// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { listen } from 'actions/songs'
import { normalizeResponse, getToken, rejected } from 'utils/operators'
import { USER } from 'schemas'

const current: Epic = (action$, store) => action$
  .ofType(types.USER_CURRENT_REQUEST)
  .mergeMap(API.me(getToken(store)))
  .pluck('response')
  .mergeMap(response => Rx$.merge(
    Rx$.of(normalizeResponse(response, USER)),
    Rx$.of(listen(store.getState().channels.id)),
  )
  .catch(rejected(types.USER_CURRENT_FAILURE))
)

export default [
  current
]
