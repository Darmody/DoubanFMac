import Immutable from 'seamless-immutable'
import * as actions from 'actions/entities'
import reducer from 'reducers/entities'

describe('reducer::entities', () => {
  it('initialize state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('存储 entity', () => {
    expect(
      reducer(undefined, actions.save({ users: { 1: { id: 1 } } })),
    ).toMatchSnapshot()
  })

  it('更新 entity 字段', () => {
    const newName = 'new name'
    const state = reducer(
      Immutable({ users: { 1: { name: 'name' } } }),
      actions.update([{ field: ['users', 1, 'name'], value: newName }])
    )

    expect(state).toMatchSnapshot()
    expect(state.users['1'].name).toBe(newName)
  })
})
