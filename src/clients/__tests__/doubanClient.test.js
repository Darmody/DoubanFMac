import doubanClient from '../doubanClient'

describe('doubanClient', () => {
  beforeEach(() => {
    window.fetch = jest.fn()
  })

  describe('authorize', () => {
    test('第一次登录', () => {
      doubanClient.authorize('user', 'password')

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][0]).toBe('https://frodo.douban.com/service/auth2/token')
    })

    test('刷新token', () => {
      doubanClient.authorize('refreshToken')

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][0]).toBe('https://frodo.douban.com/service/auth2/token')
    })
  })
})
