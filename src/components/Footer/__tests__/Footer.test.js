import React from 'react'
import renderer from 'react-test-renderer'
import Footer from 'components/Footer'

describe('Component::Footer', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Footer />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
