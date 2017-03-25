import React from 'react'
import renderer from 'react-test-renderer'
import Header from 'components/Header'

describe('Component::Header', () => {
  test('auth = false 时渲染 LoginPanel', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('auth = true 时渲染 UserPanel', () => {
    const component = renderer.create(<Header auth />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

})
