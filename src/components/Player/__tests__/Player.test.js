import React from 'react'
import renderer from 'react-test-renderer'
import Player from 'components/Player'

describe('Component::Player', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Player />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
