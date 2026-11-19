process.env.REACT_APP_DATA_MODE = 'api'

const mockFetchConf = jest.fn()
const mockFetchGet = jest.fn()

jest.mock('../../../BackConfig', () => ({
  FetchConf: (...args) => mockFetchConf(...args),
  FetchGet: (...args) => mockFetchGet(...args),
}))

jest.mock('../../../mock/MockApi', () => ({
  MockFetchConf: jest.fn(),
}))

const {
  createFidelizedUser,
  lookupFidelizedUserDocument,
  listFidelizedUsers,
  updateFidelizedUser,
} = require('./FidelizedUsersService')

describe('FidelizedUsersService live contract', () => {
  beforeEach(() => {
    mockFetchConf.mockResolvedValue({status: true, content: {id: 'client-1'}})
    mockFetchGet.mockResolvedValue({status: true, content: []})
    localStorage.setItem('emisores.content[0]', JSON.stringify({rucEmisor: '20111111111'}))
  })

  afterEach(() => {
    mockFetchConf.mockReset()
    mockFetchGet.mockReset()
    localStorage.clear()
  })

  test('uses the Extranet clients endpoint and maps create fields to its DTO', async () => {
    await createFidelizedUser({
      nombres: 'María',
      apellidoPaterno: 'García',
      apellidoMaterno: 'López',
      tipoDocumento: 'DNI',
      documento: '70123456',
      usuario: 'mgarcia',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      activo: true,
    })

    expect(mockFetchConf).toHaveBeenCalledWith(
      'extranet/auth/clients',
      'POST',
      expect.objectContaining({
        rucEmisor: '20111111111',
        is_active: true,
        tipoDocumento: 'DNI',
        documento: '70123456',
      }),
    )
    expect(mockFetchConf.mock.calls[0][2]).not.toHaveProperty('confirmPassword')
    expect(mockFetchConf.mock.calls[0][2]).not.toHaveProperty('activo')
  })

  test('keeps issuer scope and sends editable identity fields in update payloads', async () => {
    await updateFidelizedUser({
      id: 'client-1',
      usuario: 'mgarcia',
      tipoDocumento: 'DNI',
      documento: '70123456',
      nombres: 'María actualizada',
      activo: false,
    })

    expect(mockFetchConf).toHaveBeenCalledWith(
      'extranet/auth/clients/client-1',
      'PATCH',
      expect.any(Object),
    )
    const [, , payload] = mockFetchConf.mock.calls[0]
    expect(payload).toEqual(expect.objectContaining({
      rucEmisor: '20111111111',
      is_active: false,
      nombres: 'María actualizada',
      usuario: 'mgarcia',
      tipoDocumento: 'DNI',
      documento: '70123456',
    }))
    expect(payload).not.toHaveProperty('id')
  })

  test('does not send an empty password in a profile update', async () => {
    await updateFidelizedUser({
      id: 'client-1',
      nombres: 'María actualizada',
      password: '',
    })

    const [, , payload] = mockFetchConf.mock.calls[0]
    expect(payload).toEqual(expect.objectContaining({
      nombres: 'María actualizada',
    }))
    expect(payload).not.toHaveProperty('id')
    expect(payload).not.toHaveProperty('password')
    expect(payload).not.toHaveProperty('is_active')
  })

  test('lists users through the Extranet route with issuer scope', async () => {
    await listFidelizedUsers()

    expect(mockFetchGet).toHaveBeenCalledWith(
      'extranet/auth/clients?rucEmisor=20111111111',
    )
  })

  test('consults RUC and DNI through the existing consultation API', async () => {
    mockFetchConf.mockResolvedValue({status: true, content: {razonSocial: 'Empresa demo'}})

    await lookupFidelizedUserDocument('RUC', '20123456789')
    expect(mockFetchConf).toHaveBeenNthCalledWith(
      1,
      'cpe/consultarucdni',
      'POST',
      expect.objectContaining({ruc: '20123456789', accion: 'consulta'}),
    )

    await lookupFidelizedUserDocument('DNI', '70123456')
    expect(mockFetchConf).toHaveBeenNthCalledWith(
      2,
      'cpe/consultarucdni',
      'POST',
      expect.objectContaining({dni: '70123456', accion: 'consulta'}),
    )
  })

  test('surfaces backend business errors instead of treating them as successful content', async () => {
    mockFetchConf.mockResolvedValue({
      statusCode: 422,
      message: {message: 'El usuario no dispone de comprobantes registrados.'},
    })

    await expect(createFidelizedUser({
      nombres: 'Sin comprobantes',
      tipoDocumento: 'DNI',
      documento: '70123456',
      usuario: 'sin.comprobantes',
      password: 'Password123!',
    })).rejects.toThrow('El usuario no dispone de comprobantes registrados.')
  })

  test('rejects nested 422 payloads returned by an integration wrapper', async () => {
    mockFetchConf.mockResolvedValue({
      status: true,
      content: {
        statusCode: 422,
        message: {message: 'El usuario no dispone de comprobantes registrados.'},
      },
    })

    await expect(createFidelizedUser({
      nombres: 'Sin comprobantes',
      tipoDocumento: 'RUC',
      documento: '20131376767',
      usuario: 'SIN-COMPROBANTES-0001',
      password: 'Password123!',
    })).rejects.toThrow('El usuario no dispone de comprobantes registrados.')
  })

  test('rejects a 422 body when the gateway omits statusCode', async () => {
    mockFetchConf.mockResolvedValue({
      error: 'Comprobantes no disponibles',
      message: 'El usuario no dispone de comprobantes registrados.',
    })

    await expect(createFidelizedUser({
      nombres: 'Sin comprobantes',
      tipoDocumento: 'RUC',
      documento: '20131376767',
      usuario: 'SIN-COMPROBANTES-0001',
      password: 'Password123!',
    })).rejects.toThrow('El usuario no dispone de comprobantes registrados.')
  })
})
