// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { logout } from 'actions/auth'
import { listen } from 'actions/songs'
import { save as saveEntities } from 'actions/entities'
import { normalizeResponse, getToken, rejected } from 'utils/operators'
import { USER } from 'schemas'

const startListen = store => Rx$.of(listen(store.getState().channels.id))

const current: Epic = (action$, store) => action$
  .ofType(types.USER_CURRENT_REQUEST)
  .mergeMap(() => Rx$.concat(
    API
      .me(getToken(store))()
      .pluck('response')
      .map(normalizeResponse(USER))
      .map(({ entities }) => saveEntities(entities))
      .catch(error => Rx$.merge(
        rejected(types.USER_CURRENT_FAILURE)(error),
        Rx$.of(logout()),
      )),
    startListen(store),
  )
)

export default [
  current
]
