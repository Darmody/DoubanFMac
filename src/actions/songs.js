// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const playlist = (
  channel: number,
  type?: 'n' | 'p' = 'n',
  sid?: number,
): Action => ({
  type: types.SONG_PLAYLIST_REQUEST,
  payload: {
    channel,
    sid,
    type,
  }
})

export const mark = (channel: number, sid: number): Action => ({
  type: types.SONG_MARK_REQUEST,
  payload: {
    sid,
    channel,
  }
})

export const current = (song: {}): Action => ({
  type: types.SONG_CURRENT,
  payload: song,
})
