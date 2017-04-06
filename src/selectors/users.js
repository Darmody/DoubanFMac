// @flow
import { USER } from 'schemas'
import type { StateShape } from 'constants/types/Redux'
import { selectEntity } from 'selectors/entities'

export const selectCurrent = (state: StateShape) => selectEntity(
  state, USER, state.auth.id,
)
