// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import { fetchPlayList, markAsListened } from 'clients/doubanRxClient'
import { current } from 'actions/songs'
import { normalizeResponse } from 'utils/operators'
import { SONG } from 'schemas'

const fetchOperator = store => ({ payload }) => fetchPlayList(
  payload.token || store.getState().auth.token,
  payload.channel,
  payload.type,
  payload.sid,
)

const persistSong = song => normalizeResponse(song, SONG)
const fetchFullfilled = ([song]) => Rx$.merge(
  Rx$.of(persistSong(song)),
  Rx$.of(current(song)),
)

const fetchEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_PLAYLIST_REQUEST)
  .switchMap(fetchOperator(store))
  .pluck('response', 'song')
  .mergeMap(fetchFullfilled)

const markOperator = store => ({ payload }) => markAsListened(
  payload.token || store.getState().auth.token,
  payload.channel,
  payload.sid,
)

const markEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_MARK_REQUEST)
  .mergeMap(markOperator(store))
  .map(() => ({
    type: types.SONG_MARK_SUCCESS
  }))

export default [
  fetchEpic,
  markEpic,
]
