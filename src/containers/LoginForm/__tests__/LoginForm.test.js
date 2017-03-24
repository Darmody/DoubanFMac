import React from 'react'
import renderer from 'react-test-renderer'
import LoginForm from 'containers/LoginForm'

describe('Container::LoginForm', () => {
  test('渲染正确的 DOM 结构', () => {
    const mockComponent = jest.fn(() => <form>form</form>)
    const component = renderer.create(
      <LoginForm
        component={mockComponent}
        onSubmit={fn => fn}
      />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
    expect(mockComponent.mock.calls.length).toBe(1)
    expect(mockComponent.mock.calls[0][0].handleSubmit).toBeInstanceOf(Function)
  })
})
