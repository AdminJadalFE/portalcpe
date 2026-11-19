describe('BackConfig data source', () => {
  const originalMode = process.env.REACT_APP_DATA_MODE
  const originalApiUrl = process.env.REACT_APP_API_URL
  const originalAuthApiUrl = process.env.REACT_APP_AUTH_API_URL

  afterEach(() => {
    if (originalMode === undefined) {
      delete process.env.REACT_APP_DATA_MODE
    } else {
      process.env.REACT_APP_DATA_MODE = originalMode
    }

    if (originalApiUrl === undefined) {
      delete process.env.REACT_APP_API_URL
    } else {
      process.env.REACT_APP_API_URL = originalApiUrl
    }

    if (originalAuthApiUrl === undefined) {
      delete process.env.REACT_APP_AUTH_API_URL
    } else {
      process.env.REACT_APP_AUTH_API_URL = originalAuthApiUrl
    }

    jest.resetModules()
  })

  test('uses mock responses when mock mode is enabled', async () => {
    process.env.REACT_APP_DATA_MODE = 'mock'
    const {FetchGet, IS_MOCK_MODE} = require('./BackConfig')

    const response = await FetchGet('cpe/tipocpe')

    expect(IS_MOCK_MODE).toBe(true)
    expect(response.status).toBe(true)
    expect(response.content.length).toBeGreaterThan(0)
  })

  test('keeps the real API as the default mode', async () => {
    delete process.env.REACT_APP_DATA_MODE
    delete process.env.REACT_APP_API_URL
    const fetchResponse = {status: true, content: []}
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fetchResponse),
    })

    const {FetchGet, IS_MOCK_MODE, URL_BACK} = require('./BackConfig')
    const response = await FetchGet('health')

    expect(IS_MOCK_MODE).toBe(false)
    expect(URL_BACK).toBe('https://api.jadal.pe/api/')
    expect(response).toEqual(fetchResponse)
    expect(global.fetch).toHaveBeenCalledWith('https://api.jadal.pe/api/health')
  })

  test('uses the configured API URL for local development', async () => {
    delete process.env.REACT_APP_DATA_MODE
    delete process.env.REACT_APP_AUTH_API_URL
    process.env.REACT_APP_API_URL = 'http://localhost:8087'
    const fetchResponse = {status: true, content: []}
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fetchResponse),
    })

    const {FetchGet, URL_BACK} = require('./BackConfig')
    const response = await FetchGet('health')

    expect(URL_BACK).toBe('http://localhost:8087/')
    expect(response).toEqual(fetchResponse)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8087/health')
  })

  test('routes local Auth requests to auth-ms', async () => {
    delete process.env.REACT_APP_DATA_MODE
    process.env.REACT_APP_API_URL = 'http://localhost:8087'
    process.env.REACT_APP_AUTH_API_URL = 'http://localhost:8079'
    const fetchResponse = {status: true, content: {accessToken: 'demo-token'}}
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(fetchResponse),
    })

    const {FetchConf, URL_AUTH_BACK} = require('./BackConfig')
    const response = await FetchConf('auth/user/login', 'POST', {emailUsuario: 'demo.admin@example.test'})

    expect(URL_AUTH_BACK).toBe('http://localhost:8079/')
    expect(response).toEqual(fetchResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8079/auth/user/login',
      expect.objectContaining({method: 'POST'}),
    )
  })
})
