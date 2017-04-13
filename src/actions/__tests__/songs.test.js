import * as actions from '../songs'

describe('action::songs', () => {
  it('创建一个 ban action', () => {
    expect(actions.ban(1, 2)).toMatchSnapshot()
  })

  it('创建一个 current action', () => {
    expect(actions.current({ sid: 1 })).toMatchSnapshot()
  })

  it('创建一个 like action', () => {
    expect(actions.like(1, 2)).toMatchSnapshot()
  })

  it('创建一个 dislike action', () => {
    expect(actions.dislike(1, 2)).toMatchSnapshot()
  })

  it('创建一个 listen action', () => {
    expect(actions.listen(1)).toMatchSnapshot()
  })

  it('创建一个 next action', () => {
    expect(actions.next(1, 2)).toMatchSnapshot()
  })

  it('创建一个 mark action', () => {
    expect(actions.mark(1, 2)).toMatchSnapshot()
  })

  it('创建一个 playedList action', () => {
    expect(actions.playedList(0, 10)).toMatchSnapshot()
  })
})
