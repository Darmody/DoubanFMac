import React from 'react'
import { Provider } from 'react-redux'
import mockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import Header from 'components/Header'

describe('Component::Header', () => {
  test('未登录时渲染 LoginPanel', () => {
    const store = mockStore()({ auth: {}, entities: {} })
    const component = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    const tree = component.html()

    expect(tree).toMatchSnapshot()
    expect(component.find('LoginPanelComponent')).toHaveLength(1)
    expect(component.find('UserPanelComponent')).toHaveLength(0)
  })

  test('登录后渲染 UserPanel', () => {
    const store = mockStore()({
      auth: { id: 1 },
      channels: {
        id: 1,
      },
      songs: {
        playedIds: [],
      },
      entities: {
        users: {
          1: {
            userId: 1,
            icon: 'icon',
            playedNum: 1,
          }
        }
      }
    })
    const component = mount(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    const tree = component.html()

    expect(tree).toMatchSnapshot()
    expect(component.find('LoginPanelComponent')).toHaveLength(0)
    expect(component.find('UserPanelComponent')).toHaveLength(1)
  })

})
