import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Form from '../Form'

describe('Component::Login Form', () => {
  test('渲染正确的 DOM 结构', () => {
    const component = renderer.create(<Form handleSubmit={fn => fn} />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('登录按钮正确响应 hamdleSubmit 方法', () => {
    const mockSubmit = jest.fn()
    const component = shallow(<Form handleSubmit={mockSubmit} />)

    component.find('[type="submit"]').simulate('click')

    expect(mockSubmit.mock.calls.length).toBe(1)
  })
})
