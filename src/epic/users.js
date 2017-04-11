// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { listen } from 'actions/songs'
import { normalizeResponse, getToken, rejected } from 'utils/operators'
import { USER } from 'schemas'

const startListen = store => Rx$.of(listen(store.getState().channels.id))

const current: Epic = (action$, store) => action$
  .ofType(types.USER_CURRENT_REQUEST)
  .mergeMap(() => Rx$.concat(
    API
      .me(getToken(store))()
      .pluck('response')
      .map(response => normalizeResponse(response, USER))
      .catch(rejected(types.USER_CURRENT_FAILURE)),
    startListen(store),
  )
)

export default [
  current
]
