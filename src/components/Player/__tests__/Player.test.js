import React from 'react'
import { Provider } from 'react-redux'
import mockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import Player from 'components/Player'

describe('Component::Player', () => {
  test('渲染正确的 DOM 结构', () => {
    const store = mockStore()({
      auth: {},
      entities: {
        songs: {
          1: { sid: 1 },
        }
      },
      channels: {
        id: 1,
      },
      songs: {
        id: 1,
      }
    })
    const component = renderer.create(
      <Provider store={store}>
        <Player />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
