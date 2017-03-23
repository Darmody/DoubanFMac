import React from 'react'
import renderer from 'react-test-renderer'
import Body from 'components/Body'

describe('Component::Body', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Body />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
