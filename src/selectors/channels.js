// @flow
import type { StateShape } from 'constants/types/Redux'

export const selectCurrent = (state: StateShape) => state.channels.id
