import {MockFetchConf, MockFetchGet} from './mock/MockApi'

const DEFAULT_API_URL = 'https://api.jadal.pe/api/'
const configuredApiUrl = process.env.REACT_APP_API_URL?.trim()
const configuredAuthApiUrl = process.env.REACT_APP_AUTH_API_URL?.trim()

const normalizeApiUrl = (value) => `${value}`.replace(/\/+$/, '') + '/'

// Keep the production API as the default while allowing local environments to override it.
export const URL_BACK = normalizeApiUrl(configuredApiUrl || DEFAULT_API_URL)
export const URL_AUTH_BACK = normalizeApiUrl(configuredAuthApiUrl || URL_BACK)
export const URL_BUCKET = 'https://jadalfecpe.s3.amazonaws.com/';
export const DATA_MODE = (process.env.REACT_APP_DATA_MODE || 'api').toLowerCase()
export const IS_MOCK_MODE = DATA_MODE === 'mock'

export const resolveApiUrl = (endpoint = '') =>
    endpoint === 'auth' || endpoint.startsWith('auth/') ? URL_AUTH_BACK : URL_BACK

export const FetchGet = async (endpoint) => {
    if (IS_MOCK_MODE) {
        return MockFetchGet(endpoint)
    }

    const response = await fetch(resolveApiUrl(endpoint) + endpoint);
    const content = await response.json();
    return content;
}

export const FetchConf = async (endpoint, method, data) => {
    if (IS_MOCK_MODE) {
        return MockFetchConf(endpoint, method, data)
    }

    const config = {
        method: method,
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    }
    const response = await fetch(resolveApiUrl(endpoint) + endpoint, config);
    const content = await response.json();
    return content;
}

