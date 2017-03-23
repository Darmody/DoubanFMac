import React from 'react'
import renderer from 'react-test-renderer'
import Header from 'components/Header'

describe('Component::Header', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
