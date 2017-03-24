import React from 'react'
import renderer from 'react-test-renderer'
import App from 'containers/App'

describe('Container::App', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
