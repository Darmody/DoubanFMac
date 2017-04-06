import React from 'react'
import renderer from 'react-test-renderer'
import UserPanel from 'components/Header/UserPanel'

describe('Component::UserPanel', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<UserPanel me={{ icon: 'icon', playedNum: 1 }} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
