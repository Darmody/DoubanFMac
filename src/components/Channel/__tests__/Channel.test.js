import React from 'react'
import renderer from 'react-test-renderer'
import Channel from 'components/Channel'

describe('Component::Channel', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Channel />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
