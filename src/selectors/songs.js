// @flow
import { SONG } from 'schemas'
import type { StateShape } from 'constants/types/Redux'
import { selectEntity } from 'selectors/entities'

export const selectCurrent = (state: StateShape) => selectEntity(
  state, SONG, state.songs.id,
)
