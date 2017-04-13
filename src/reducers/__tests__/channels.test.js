import reducer from 'reducers/entities'

describe('reducer::channels', () => {
  it('initialize state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })
})
