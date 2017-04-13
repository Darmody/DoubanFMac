import * as actions from '../users'

describe('action::users', () => {
  it('创建一个 current action', () => {
    expect(actions.current()).toMatchSnapshot()
  })
})
