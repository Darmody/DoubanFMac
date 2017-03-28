import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import LoginForm from 'containers/LoginForm'

describe('Container::LoginForm', () => {
  test('渲染正确的 DOM 结构', () => {
    const store = configureMockStore()({ auth: {} })
    const mockComponent = jest.fn(() => <form>form</form>)
    const component = mount(
      <Provider store={store}>
        <LoginForm component={mockComponent} />
      </Provider>
    )
    const tree = component.html()

    expect(tree).toMatchSnapshot()
    expect(mockComponent.mock.calls.length).toBe(1)
    expect(mockComponent.mock.calls[0][0].handleSubmit).toBeInstanceOf(Function)
  })
})
