// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { current } from 'actions/songs'
import { update as updateEntities } from 'actions/entities'
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
const banEpic: Epic = fetchSong(types.SONG_BAN_REQUEST, API.banSong)

const markEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_MARK_REQUEST)
  .pluck('payload')
  .mergeMap(API.markSong(getToken(store)))
  .map(fullfilled(types.SONG_MARK_SUCCESS))

const likeEpic: Epic = (action$, store) => {
  const likeFullfilled = sid => () => Rx$.of(updateEntities([{
    field: ['songs', sid, 'like'],
    value: 1,
  }]))

  return action$
    .ofType(types.SONG_LIKE_REQUEST)
    .pluck('payload')
    .mergeMap(payload => API
      .likeSong(getToken(store))(payload)
      .mergeMap(likeFullfilled(payload.sid))
    )
}

const dislikeEpic: Epic = (action$, store) => {
  const dislikeFullfilled = sid => () => Rx$.of(updateEntities([{
    field: ['songs', sid, 'like'],
    value: 0,
  }]))

  return action$
    .ofType(types.SONG_DISLIKE_REQUEST)
    .pluck('payload')
    .mergeMap(payload => API
      .dislikeSong(getToken(store))(payload)
      .mergeMap(dislikeFullfilled(payload.sid))
    )
}

export default [
  banEpic,
  dislikeEpic,
  likeEpic,
  listenEpic,
  markEpic,
  nextEpic,
]
