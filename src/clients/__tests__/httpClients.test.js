import httpClient from '../httpClient'

describe('httpClient', () => {
  beforeEach(() => {
    window.fetch = jest.fn()
  })

  test('设置好初始值', () => {
    httpClient({})

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(fetchCalls[0][1]).toMatchSnapshot('httpclient::defaultValue')

    httpClient()

    expect(window.fetch.mock.calls.length).toMatchSnapshot('httpclient::defaultValue')

  })

  test('method 自动转化为大写', () => {
    httpClient({ method: 'get' })

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(fetchCalls[0][1].method).toBe('GET')
  })

  test('处理 json 类型的请求', () => {
    const body = { field: 'value' }

    httpClient({
      method: 'post',
      body,
      json: true,
    })

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(JSON.parse(fetchCalls[0][1].body)).toMatchObject(body)
    expect(fetchCalls[0][1].headers['Content-Type']).toBe('application/json')
  })

  test('处理 form-urlencode 类型的请求', () => {
    const body = { field: 'value' }
    const contentType = 'application/x-www-form-urlencoded'

    httpClient({
      method: 'post',
      body,
      headers: {
        'Content-Type': contentType,
      }
    })

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(fetchCalls[0][1].body).toBe('field=value')
    expect(fetchCalls[0][1].headers['Content-Type']).toBe(contentType)
  })

  test('当 get 请求时, 去除 body', () => {
    const body = { field: 'value' }

    httpClient({
      method: 'get',
      body,
    })

    const fetchCalls = window.fetch.mock.calls
    expect(fetchCalls.length).toBe(1)
    expect(fetchCalls[0][1].body).toBeUndefined()
  })
})
