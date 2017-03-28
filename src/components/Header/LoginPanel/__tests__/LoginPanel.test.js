import React from 'react'
import renderer from 'react-test-renderer'
import LoginPanel from 'components/Header/LoginPanel'

describe('Component::LoginPanel', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<LoginPanel />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
