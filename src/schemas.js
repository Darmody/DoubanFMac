import { schema } from 'normalizr'

export const USER = new schema.Entity('users', {}, { idAttribute: 'userId' })
