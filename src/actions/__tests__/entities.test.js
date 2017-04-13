import * as actions from '../entities'

describe('action::entities', () => {
  it('创建一个保存 entities action', () => {
    expect(actions.save({
      user: { 1: { id: 1 } }
    })).toMatchSnapshot()
  })

  it('创建一个更新 entity 字段 action', () => {
    expect(actions.update([{
      field: ['users', '1', 'id'], value: 2,
    }])).toMatchSnapshot()
  })
})
