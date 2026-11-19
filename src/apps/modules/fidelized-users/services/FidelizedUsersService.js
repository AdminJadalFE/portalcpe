import {FetchConf, FetchGet} from '../../../BackConfig'
import {MockFetchConf} from '../../../mock/MockApi'

const configuredMode = process.env.REACT_APP_DATA_MODE?.toLowerCase()
const useMockData = configuredMode === 'mock'
const endpoint = (mockPath, liveSuffix = '') =>
  useMockData ? mockPath : `extranet/auth/clients${liveSuffix}`

const FIDELIZED_USERS_ENDPOINTS = {
  list: endpoint('fidelized/user/list'),
  create: endpoint('fidelized/user/create'),
  update: (id) => endpoint('fidelized/user/update', `/${encodeURIComponent(id)}`),
  remove: (id) => endpoint('fidelized/user/delete', `/${encodeURIComponent(id)}`),
}

const DOCUMENT_LOOKUP_ENDPOINT = 'cpe/consultarucdni'

const getIssuerRuc = () => {
  try {
    const currentIssuer = JSON.parse(localStorage.getItem('emisores.content[0]') || 'null')
    const user = JSON.parse(localStorage.getItem('data') || 'null')
    return currentIssuer?.rucEmisor || user?.rucEmisor || ''
  } catch {
    return ''
  }
}

const withIssuerScope = (data = {}) => ({
  ...data,
  rucEmisor: data.rucEmisor || getIssuerRuc(),
})

const mapCreateRequest = (data = {}) => {
  const request = {...data}
  const activo = request.activo
  const apellidos = request.apellidos
  delete request.confirmPassword
  delete request.activo
  delete request.apellidos

  return withIssuerScope({
    ...request,
    is_active: activo !== false,
    ...(apellidos && !request.apellidoPaterno && {apellidoPaterno: apellidos}),
  })
}

const mapUpdateRequest = (data = {}) => {
  const request = {...data}
  const activo = request.activo
  const apellidos = request.apellidos
  delete request.id
  delete request.confirmPassword
  delete request.activo
  delete request.apellidos

  const {
    email,
    usuario,
    tipoDocumento,
    documento,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    razonSocial,
    password,
  } = request

  return withIssuerScope({
    ...(email !== undefined && {email}),
    ...(usuario !== undefined && {usuario}),
    ...(tipoDocumento !== undefined && {tipoDocumento}),
    ...(documento !== undefined && {documento}),
    ...(nombres !== undefined && {nombres}),
    ...(apellidoPaterno !== undefined && {apellidoPaterno}),
    ...(apellidoMaterno !== undefined && {apellidoMaterno}),
    ...(razonSocial !== undefined && {razonSocial}),
    ...(password ? {password} : {}),
    ...(activo !== undefined && {is_active: activo !== false}),
    ...(apellidos && !apellidoPaterno && {apellidoPaterno: apellidos}),
  })
}

const getErrorMessage = (response) => {
  if (!response) return ''
  if (typeof response === 'string') return response
  if (typeof response.message === 'string') return response.message
  if (typeof response.message?.message === 'string') return response.message.message
  if (typeof response.error === 'string') return response.error
  return ''
}

const isErrorResponse = (response) =>
  response?.status === false
  || Number(response?.statusCode) >= 400
  || typeof response?.error === 'string'

const getContent = async (endpoint, method = 'POST', data = {}) => {
  const response = await (useMockData ? MockFetchConf : FetchConf)(endpoint, method, data)
  return unwrapResponse(response)
}

const unwrapResponse = (response) => {
  if (isErrorResponse(response)) {
    throw new Error(getErrorMessage(response) || 'No se pudo completar la operación')
  }

  const content = response?.content
  if (isErrorResponse(content)) {
    throw new Error(getErrorMessage(content) || 'No se pudo completar la operación')
  }

  return content ?? response
}

export const listFidelizedUsers = (filters = {}) => {
  const scopedFilters = withIssuerScope(filters)
  if (useMockData) {
    return getContent(FIDELIZED_USERS_ENDPOINTS.list, 'POST', scopedFilters)
  }

  const {rucEmisor} = scopedFilters
  const query = `?rucEmisor=${encodeURIComponent(rucEmisor)}`
  return FetchGet(`${FIDELIZED_USERS_ENDPOINTS.list}${query}`).then(unwrapResponse)
}

export const lookupFidelizedUserDocument = (tipoDocumento, documento) => {
  if (!['RUC', 'DNI'].includes(tipoDocumento)) {
    return Promise.reject(new Error('La consulta solo está disponible para RUC y DNI'))
  }

  const value = documento?.trim()
  if (!value) return Promise.reject(new Error('Ingresa un documento para consultar'))

  const request = {
    accion: 'consulta',
    ...(tipoDocumento === 'RUC' ? {ruc: value} : {dni: value}),
  }

  return getContent(DOCUMENT_LOOKUP_ENDPOINT, 'POST', request)
}

export const createFidelizedUser = (data) =>
  getContent(FIDELIZED_USERS_ENDPOINTS.create, 'POST', mapCreateRequest(data))

export const updateFidelizedUser = (data) => {
  const payload = mapUpdateRequest(data)
  const requestData = useMockData ? {...payload, id: data.id} : payload
  return getContent(FIDELIZED_USERS_ENDPOINTS.update(data.id), 'PATCH', requestData)
}

export const deleteFidelizedUser = (id) => {
  const {rucEmisor} = withIssuerScope({id})
  return getContent(
    `${FIDELIZED_USERS_ENDPOINTS.remove(id)}?rucEmisor=${encodeURIComponent(rucEmisor)}`,
    'DELETE',
  )
}

export const changeFidelizedUserPassword = (id, password) =>
  updateFidelizedUser({id, password})

export const toggleFidelizedUserStatus = (id, activo) =>
  updateFidelizedUser({id, activo})
