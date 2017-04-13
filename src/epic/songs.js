// @flow
import { Observable as Rx$ } from 'rxjs'
import * as types from 'constants/types/ActionTypes'
import type { Epic } from 'constants/types/Redux'
import * as API from 'clients/doubanRxClient'
import { current } from 'actions/songs'
import {
  update as updateEntities,
  save as saveEntities,
} from 'actions/entities'
import { normalizeResponse, getToken, fullfilled } from 'utils/operators'
import { SONG, SONG_ARRAY } from 'schemas'

const fetchSong = (type, api) => (action$, store) => action$
  .ofType(type)
  .pluck('payload')
  .switchMap(payload => api(getToken(store), payload))
  .pluck('response', 'song')
  .map(([song]) => song)
  .map(normalizeResponse(SONG))
  .mergeMap(({ result, entities }) => Rx$.merge(
    Rx$.of(saveEntities(entities)),
    Rx$.of(current(entities.songs[result]))
  ))

const nextEpic: Epic = fetchSong(types.SONG_NEXT_REQUEST, API.nextSong)
const listenEpic: Epic = fetchSong(types.SONG_LISTEN_REQUEST, API.listenSong)
const banEpic: Epic = fetchSong(types.SONG_BAN_REQUEST, API.banSong)

const markEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_MARK_REQUEST)
  .pluck('payload')
  .mergeMap(payload => API.markSong(getToken(store), payload))
  .mergeMap(response => {
    const userId = store.getState().auth.id
    if (userId) {
      const playedNum = store.getState().entities.users[userId].playedNum

      return Rx$.merge(
        Rx$.of(fullfilled(types.SONG_MARK_SUCCESS)(response)),
        Rx$.of(updateEntities([{
          field: ['users', store.getState().auth.id, 'playedNum'],
          value: playedNum + 1,
        }])),
      )
    }
    return Rx$.of(fullfilled(types.SONG_MARK_SUCCESS)(response))
  })

const likeEpic: Epic = (action$, store) => {
  const likeFullfilled = sid => () => Rx$.of(updateEntities([{
    field: ['songs', sid, 'like'],
    value: 1,
  }]))

  return action$
    .ofType(types.SONG_LIKE_REQUEST)
    .pluck('payload')
    .mergeMap(payload => API
      .likeSong(getToken(store), payload)
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
      .dislikeSong(getToken(store), payload)
      .mergeMap(dislikeFullfilled(payload.sid))
    )
}

const playedListEpic: Epic = (action$, store) => action$
  .ofType(types.SONG_PLAYED_REQUEST)
  .pluck('payload')
  .switchMap(payload => API.playedSongList(getToken(store), payload))
  .pluck('response', 'songs')
  .map(normalizeResponse(SONG_ARRAY))
  .mergeMap(({ result, entities }) => Rx$.merge(
    Rx$.of(saveEntities(entities)),
    Rx$.of(fullfilled(types.SONG_PLAYED_SUCCESS)(result)),
  ))

export default [
  banEpic,
  dislikeEpic,
  likeEpic,
  listenEpic,
  markEpic,
  nextEpic,
  playedListEpic,
]
