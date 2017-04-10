// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { current } from 'actions/songs'
import { normalizeResponse, getToken, fullfilled } from 'utils/operators'
import { SONG } from 'schemas'

const fetchSong = (type, api) => (action$, store) => action$
  .ofType(type)
  .pluck('payload')
  .switchMap(api(getToken(store)))
  .pluck('response', 'song')
  .mergeMap(([song]) => Rx$.merge(
    Rx$.of(normalizeResponse(song, SONG)),
    Rx$.of(current(song)),
  ))

const nextEpic: Epic = fetchSong(types.SONG_NEXT_REQUEST, API.nextSong)
const listenEpic: Epic = fetchSong(types.SONG_LISTEN_REQUEST, API.listenSong)

const markEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_MARK_REQUEST)
  .pluck('payload')
  .mergeMap(API.markSong(getToken(store)))
  .map(fullfilled(types.SONG_MARK_SUCCESS))

export default [
  nextEpic,
  listenEpic,
  markEpic,
]
