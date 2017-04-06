import React from 'react'
import renderer from 'react-test-renderer'
import Header from 'components/Header'

describe('Component::Header', () => {
  test('me 不存在时渲染 LoginPanel', () => {
    const component = renderer.create(<Header />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('me 存在时渲染 UserPanel', () => {
    const component = renderer.create(<Header me={{ icon: 'icon', playedNum: 1 }} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

})
