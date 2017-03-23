import React from 'react'
import renderer from 'react-test-renderer'
import Lyrics from 'components/Lyrics'

describe('Component::Lyrics', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Lyrics />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
