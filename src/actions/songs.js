// @flow
import * as types from 'constants/types/ActionTypes'
import type { Action } from 'constants/types/Redux'

export const listen = (channel: number): Action => ({
  type: types.SONG_LISTEN_REQUEST,
  payload: channel,
})

export const next = (channel: number, sid?: number): Action => ({
  type: types.SONG_NEXT_REQUEST,
  payload: {
    channel,
    sid,
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
