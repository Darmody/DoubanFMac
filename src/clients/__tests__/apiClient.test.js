import apiClient from '../apiClient'

describe('apiClient', () => {
  beforeEach(() => {
    window.fetch = jest.fn()
  })

  test('自动转换为 json 请求', () => {
    apiClient({})

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(fetchCalls[0][1].headers).toEqual(expect.objectContaining({
      'Content-Type': 'application/json'
    }))
  })

  describe('verb client', () => {
    beforeEach(() => {
      window.fetch = jest.fn()
    })

    test('apiClient.get', () => {
      apiClient.get('endpoint')

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][1].method).toBe('GET')
      expect(fetchCalls[0][0]).toBe('endpoint')
    })

    test('apiClient.post', () => {
      const endpoint = 'endpoint'
      const body = { value: 'body' }
      apiClient.post({ endpoint, body })

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][1].method).toBe('POST')
      expect(fetchCalls[0][0]).toBe(endpoint)
      expect(fetchCalls[0][1].body).toBe(JSON.stringify(body))
    })

    test('apiClient.put', () => {
      const endpoint = 'endpoint'
      const body = { value: 'body' }
      apiClient.put({ endpoint, body })

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][1].method).toBe('PUT')
      expect(fetchCalls[0][0]).toBe(endpoint)
      expect(fetchCalls[0][1].body).toBe(JSON.stringify(body))
    })

    test('apiClient.patch', () => {
      const endpoint = 'endpoint'
      const body = { value: 'body' }
      apiClient.patch({ endpoint, body })

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][1].method).toBe('PATCH')
      expect(fetchCalls[0][0]).toBe(endpoint)
      expect(fetchCalls[0][1].body).toBe(JSON.stringify(body))
    })

    test('apiClient.del', () => {
      const endpoint = 'endpoint'
      const body = { value: 'body' }
      apiClient.del({ endpoint, body })

      const fetchCalls = window.fetch.mock.calls
      expect(fetchCalls.length).toBe(1)
      expect(fetchCalls[0][1].method).toBe('DELETE')
      expect(fetchCalls[0][0]).toBe(endpoint)
      expect(fetchCalls[0][1].body).toBe(JSON.stringify(body))
    })
  })
})
