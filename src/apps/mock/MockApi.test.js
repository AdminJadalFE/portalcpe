import {MockFetchConf, MockFetchGet} from './MockApi'

describe('MockApi response contracts', () => {
  test('returns dashboard payloads in the shapes consumed by the widgets', async () => {
    const totalEmission = await MockFetchConf('cpe/gettotalemision', 'POST', {})
    const totalStates = await MockFetchConf('cpe/gettotalestados', 'POST', {})
    const byType = await MockFetchConf('cpe/getestadotipocpe', 'POST', {})

    expect(totalEmission.content).toEqual(
      expect.objectContaining({totalCpe: expect.any(Number), pendienteCpe: expect.any(Number)})
    )
    expect(Array.isArray(totalStates.content)).toBe(true)
    expect(totalStates.content[0]).toEqual(
      expect.objectContaining({_id: expect.any(String), totalCpe: expect.any(Number)})
    )
    expect(byType.content).toEqual(
      expect.objectContaining({
        tipoCpe: expect.any(Array),
        totalCpe: expect.any(Array),
        rechazadoCpe: expect.any(Array),
        pendienteCpe: expect.any(Array),
        errorCpe: expect.any(Array),
      })
    )
  })

  test('returns the summary and navigation payloads expected by their pages', async () => {
    const types = await MockFetchGet('cpe/tipocpe')
    const summary = await MockFetchConf('cpe/getresumencpe', 'POST', {})
    const resumens = await MockFetchConf('cpe/getresumen', 'POST', {})
    const documents = await MockFetchConf('cpe/getcpe', 'POST', {})
    const events = await MockFetchConf('cpe/getevent', 'POST', {})

    expect(types.content[0]).toEqual(
      expect.objectContaining({tipocpeCod: expect.any(String), tipocpeDesc: expect.any(String)})
    )
    expect(summary.content).toEqual(
      expect.objectContaining({
        tipoCpe: expect.any(Array),
        aceptadoCpe: expect.any(Array),
        rechazadoCpe: expect.any(Array),
        errorCpe: expect.any(Array),
        bajaCpe: expect.any(Array),
        pendienteCpe: expect.any(Array),
        totalCpe: expect.any(Array),
      })
    )
    expect(resumens.content[0]).toEqual(
      expect.objectContaining({
        tipoCpe: expect.any(String),
        fechaResumen: expect.any(String),
        estadoResumen: expect.any(String),
      })
    )
    expect(documents.content[0]).toEqual(
      expect.objectContaining({
        urlCpe: expect.any(String),
        urlPdf: expect.any(String),
        urlCdr: expect.any(String),
      })
    )
    expect(events).toEqual(
      expect.objectContaining({cpe: expect.any(Object), eventos: expect.any(Array)})
    )
  })

  test('handles registration and resend actions without the real API', async () => {
    const user = await MockFetchConf('auth/user/register', 'POST', {})
    const company = await MockFetchConf('auth/register', 'POST', {})
    const resend = await MockFetchConf('cpe/resendcpe', 'POST', {})

    expect(user).toBe('OK')
    expect(company).toBe('OK')
    expect(resend).toEqual(
      expect.objectContaining({indicador: true, message: expect.any(String)})
    )
  })

  test('exposes the fidelized user list and management action contracts', async () => {
    const users = await MockFetchConf('fidelized/user/list', 'POST', {})
    const created = await MockFetchConf('fidelized/user/create', 'POST', {
      nombres: 'Nuevo',
      apellidos: 'Cliente',
      usuario: 'ncliente',
    })
    const updated = await MockFetchConf('fidelized/user/update', 'POST', {
      id: created.content.id,
      nombres: 'Cliente Actualizado',
    })
    const password = await MockFetchConf('fidelized/user/generate-password', 'POST', {
      id: created.content.id,
    })
    const changedPassword = await MockFetchConf('fidelized/user/change-password', 'POST', {
      id: created.content.id,
      password: 'NuevaClave123',
    })
    const deactivated = await MockFetchConf('fidelized/user/toggle-status', 'POST', {
      id: created.content.id,
      activo: false,
    })
    const deleted = await MockFetchConf('fidelized/user/delete', 'POST', {
      id: created.content.id,
    })

    expect(users.content[0]).toEqual(
      expect.objectContaining({id: expect.any(Number), nombres: expect.any(String), apellidos: expect.any(String), documento: expect.any(String), fechaCreacion: expect.any(String), fechaActualizacion: expect.any(String), usuario: expect.any(String), activo: expect.any(Boolean)})
    )
    expect(users.content.length).toBeGreaterThanOrEqual(5)
    expect(created.content).toEqual(
      expect.objectContaining({id: expect.any(Number), usuario: 'ncliente'})
    )
    expect(updated.content).toEqual(expect.objectContaining({nombres: 'Cliente Actualizado'}))
    expect(password.content).toEqual(
      expect.objectContaining({id: created.content.id, password: expect.any(String)})
    )
    expect(changedPassword.content).toEqual(
      expect.objectContaining({id: created.content.id, changed: true})
    )
    expect(deactivated.content).toEqual(expect.objectContaining({id: created.content.id, activo: false}))
    expect(deleted.content).toEqual(expect.objectContaining({id: created.content.id, deleted: true}))
  })
})
