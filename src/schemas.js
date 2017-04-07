import { schema } from 'normalizr'

export const SONG = new schema.Entity('songs', {}, { idAttribute: 'sid' })
export const USER = new schema.Entity('users', {}, { idAttribute: 'userId' })
