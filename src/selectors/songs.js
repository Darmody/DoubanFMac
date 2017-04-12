// @flow
import { SONG, SONG_ARRAY } from 'schemas'
import type { StateShape } from 'constants/types/Redux'
import { selectEntity, selectEntities } from 'selectors/entities'

export const selectCurrent = (state: StateShape) => selectEntity(
  state, SONG, state.songs.id,
)

export const selectSongs = (state: StateShape, ids: []) => selectEntities(
  state, SONG_ARRAY, ids,
)
