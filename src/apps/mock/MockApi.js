const mockDelay = (value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), 150)
  })

const success = (content) => ({status: true, content})

const mockTypes = [
  {tipocpeCod: '01', tipocpeDesc: 'Factura'},
  {tipocpeCod: '03', tipocpeDesc: 'Boleta'},
  {tipocpeCod: '07', tipocpeDesc: 'Nota de crédito'},
  {tipocpeCod: '08', tipocpeDesc: 'Nota de débito'},
]

const mockStatuses = [
  {estado_cod: 'ACEPTADO', estado_desc: 'ACEPTADO'},
  {estado_cod: 'RECHAZADO', estado_desc: 'RECHAZADO'},
  {estado_cod: 'PENDIENTE', estado_desc: 'PENDIENTE'},
]

const mockDocuments = [
  {
    id: 1,
    tipoCpe: '01',
    serieCpe: 'F001',
    numeroCpe: '00001234',
    nombreReceptor: 'Comercial Demo S.A.C.',
    fechaCpe: '2024-11-04',
    fechaPublicacion: '2024-11-04 10:30:00',
    monedaCpe: 'PEN',
    totalCpe: 118.9,
    estadoCpe: 'ACEPTADO',
    rucEmisor: '20123456789',
    nombreEmisor: 'Empresa Demo S.A.C.',
    rucReceptor: '20987654321',
    urlCpe: 'https://example.com/mock/document.xml',
    urlPdf: 'https://example.com/mock/document.pdf',
    urlCdr: 'https://example.com/mock/document-cdr.zip',
  },
  {
    id: 2,
    tipoCpe: '03',
    serieCpe: 'B001',
    numeroCpe: '00000451',
    nombreReceptor: 'Cliente de Prueba',
    fechaCpe: '2024-11-05',
    fechaPublicacion: '2024-11-05 15:45:00',
    monedaCpe: 'PEN',
    totalCpe: 59.9,
    estadoCpe: 'PENDIENTE',
    rucEmisor: '20123456789',
    nombreEmisor: 'Empresa Demo S.A.C.',
    rucReceptor: '20987654321',
    urlCpe: 'https://example.com/mock/document-2.xml',
    urlPdf: 'https://example.com/mock/document-2.pdf',
    urlCdr: 'https://example.com/mock/document-2-cdr.zip',
  },
]

const mockResumeSummary = {
  tipoCpe: ['01', '03'],
  aceptadoCpe: [8, 6],
  rechazadoCpe: [1, 0],
  errorCpe: [0, 1],
  bajaCpe: [0, 0],
  pendienteCpe: [1, 0],
  totalCpe: [10, 7],
}

const mockResumenDocuments = [
  {
    id: 1,
    tipoCpe: '01',
    serieCpe: 'RC01',
    numeroCpe: '00000001',
    fechaResumen: '2024-11-04',
    fechaPublicacion: '2024-11-04 11:00:00',
    estadoResumen: 'ACEPTADO',
    urlCpe: 'https://example.com/mock/resumen.xml',
    urlPdf: 'https://example.com/mock/resumen.pdf',
    urlCdr: 'https://example.com/mock/resumen-cdr.zip',
  },
]

const mockEmisor = {
  rucEmisor: '20123456789',
  razonSocialEmisor: 'Empresa Demo S.A.C.',
}

const mockFidelizedUsers = [
  {
    id: 1,
    nombres: 'María',
    apellidos: 'García',
    documento: '70123456',
    fechaCreacion: '2025-01-15T09:00:00-05:00',
    fechaActualizacion: '2025-01-15T09:00:00-05:00',
    usuario: 'mgarcia',
    activo: true,
  },
  {
    id: 2,
    nombres: 'Carlos',
    apellidos: 'Mendoza',
    documento: '70234567',
    fechaCreacion: '2025-02-03T10:30:00-05:00',
    fechaActualizacion: '2025-02-18T14:15:00-05:00',
    usuario: 'cmendoza',
    activo: true,
  },
  {
    id: 3,
    nombres: 'Ana',
    apellidos: 'Torres',
    documento: '70345678',
    fechaCreacion: '2025-02-21T08:45:00-05:00',
    fechaActualizacion: '2025-03-01T11:20:00-05:00',
    usuario: 'atorres',
    activo: false,
  },
  {
    id: 4,
    nombres: 'Lucía',
    apellidos: 'Fernández',
    documento: '70456789',
    fechaCreacion: '2025-03-10T12:00:00-05:00',
    fechaActualizacion: '2025-03-10T12:00:00-05:00',
    usuario: 'lfernandez',
    activo: true,
  },
  {
    id: 5,
    nombres: 'Jorge',
    apellidos: 'Ramírez',
    documento: '70567890',
    fechaCreacion: '2025-03-18T16:30:00-05:00',
    fechaActualizacion: '2025-03-25T09:10:00-05:00',
    usuario: 'jramirez',
    activo: false,
  },
]

let fidelizedUsers = mockFidelizedUsers.map((user) => ({...user}))

const createMockPassword = (id) => `Jadal-${String(id).padStart(4, '0')}`

const mockGet = (endpoint) => {
  switch (endpoint) {
    case 'cpe/tipocpe':
      return success(mockTypes)
    case 'cpe/estadocpe':
      return success(mockStatuses)
    case 'cpe/getunidad':
      return success([{codigoUnidad: 'NIU', descripcionUnidad: 'UNIDAD'}])
    case 'cpe/getmoneda':
      return success([{codigoMoneda: 'PEN', descripcionMoneda: 'Soles'}])
    case 'cpe/gettipodocrel':
      return success([{codigoTipoDocRel: '01', descripcionTipoDocRel: 'Factura'}])
    case 'cpe/gettipoafectacion':
      return success([{codigoTipoAfectacion: '10', descripcionTipoAfectacion: 'Gravado'}])
    case 'cpe/getformapago':
      return success([{codigoFormaPago: '01', descripcionFormaPago: 'Contado'}])
    case 'cpe/gettiponota':
      return success([{codigoTipoNota: '01', descripcionTipoNota: 'Anulación de la operación'}])
    default:
      return success([])
  }
}

const mockPost = (endpoint, data = {}) => {
  switch (endpoint) {
    case 'auth/user/login':
      return {
        status: true,
        usuario: {emailUsuario: 'demo@jadal.pe', nombreUsuario: 'Usuario Demo'},
      }
    case 'auth/useremisor/getemisorbyuser':
      return success([mockEmisor])
    case 'auth/user/updatepwd':
      return success('Contraseña actualizada')
    case 'auth/user/register':
    case 'auth/register':
      return 'OK'
    case 'cpe/sedes':
      return success([{sede: 'Principal'}])
    case 'cpe/getdataresumen':
      return success([
        { _id: '01', montoCpe: 1250.5, totalCpe: 10 },
        { _id: '03', montoCpe: 485.2, totalCpe: 7 },
      ])
    case 'cpe/gettotalemision':
      return success({totalCpe: 17, pendienteCpe: 2, montoCpe: 1735.7})
    case 'cpe/gettotalestados':
      return success([
        {_id: 'ACEPTADO', totalCpe: 14},
        {_id: 'RECHAZADO', totalCpe: 1},
        {_id: 'PENDIENTE', totalCpe: 2},
      ])
    case 'cpe/getestadotipocpe':
      return success({
        tipoCpe: ['01', '03'],
        totalCpe: [10, 7],
        rechazadoCpe: [1, 0],
        pendienteCpe: [1, 1],
        errorCpe: [0, 0],
      })
    case 'cpe/getcpe':
      return success(mockDocuments)
    case 'cpe/getresumen':
      return success(mockResumenDocuments)
    case 'cpe/getresumencpe':
      return success(mockResumeSummary)
    case 'cpe/getreporte':
      return success([])
    case 'cpe/getserie':
      return success([])
    case 'cpe/createcpe':
      return {status: true, content: 'Comprobante simulado correctamente'}
    case 'cpe/createserie':
    case 'cpe/updateserie':
      return success('Operación simulada correctamente')
    case 'cpe/createreporte':
      return {status: true, content: 'Reporte simulado correctamente'}
    case 'cpe/sendemail':
      return success([])
    case 'cpe/resendcpe':
      return {indicador: true, message: 'CPE reenviado correctamente'}
    case 'cpe/getevent':
      return {
        cpe: mockDocuments[0],
        eventos: [
          {
            _id: 'mock-event-1',
            tipo: 'REGISTER',
            fechaHora: '2024-11-04 10:30:00',
            detalleEvento: 'Comprobante registrado en modo mock',
          },
          {
            _id: 'mock-event-2',
            tipo: 'SENDCPE',
            fechaHora: '2024-11-04 10:31:00',
            detalleEvento: 'Comprobante enviado en modo mock',
          },
        ],
      }
    case 'cpe/consultarucdni':
      return {status: true, content: {razonSocial: 'Receptor Demo S.A.C.'}}
    case 'fidelized/user/list':
      return success(fidelizedUsers.map((user) => ({...user})))
    case 'fidelized/user/create': {
      const nextId = Math.max(0, ...fidelizedUsers.map((user) => user.id)) + 1
      const user = {
        id: nextId,
        nombres: data.nombres,
        apellidos: data.apellidos,
        documento: data.documento || '',
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        usuario: data.usuario,
        activo: data.activo !== false,
      }
      fidelizedUsers = [...fidelizedUsers, user]
      return success({...user})
    }
    case 'fidelized/user/update': {
      const currentUser = fidelizedUsers.find((user) => user.id === Number(data.id))
      if (!currentUser) return {status: false, message: 'Usuario no encontrado'}
      const updatedUser = {...currentUser, ...data, id: currentUser.id, fechaActualizacion: new Date().toISOString()}
      delete updatedUser.password
      fidelizedUsers = fidelizedUsers.map((user) => user.id === currentUser.id ? updatedUser : user)
      return success({...updatedUser})
    }
    case 'fidelized/user/toggle-status': {
      const currentUser = fidelizedUsers.find((user) => user.id === Number(data.id))
      if (!currentUser) return {status: false, message: 'Usuario no encontrado'}
      const updatedUser = {...currentUser, activo: Boolean(data.activo)}
      fidelizedUsers = fidelizedUsers.map((user) => user.id === currentUser.id ? updatedUser : user)
      return success({...updatedUser})
    }
    case 'fidelized/user/delete': {
      const userId = Number(data.id)
      const exists = fidelizedUsers.some((user) => user.id === userId)
      if (!exists) return {status: false, message: 'Usuario no encontrado'}
      fidelizedUsers = fidelizedUsers.filter((user) => user.id !== userId)
      return success({id: userId, deleted: true})
    }
    case 'fidelized/user/change-password': {
      const exists = fidelizedUsers.some((user) => user.id === Number(data.id))
      if (!exists) return {status: false, message: 'Usuario no encontrado'}
      return success({id: Number(data.id), changed: true})
    }
    case 'fidelized/user/generate-password': {
      const exists = fidelizedUsers.some((user) => user.id === Number(data.id))
      if (!exists) return {status: false, message: 'Usuario no encontrado'}
      return success({id: Number(data.id), password: createMockPassword(Number(data.id))})
    }
    default:
      return success([])
  }
}

export const MockFetchGet = async (endpoint) => mockDelay(mockGet(endpoint))

export const MockFetchConf = async (endpoint, method, data) => {
  void method
  return mockDelay(mockPost(endpoint, data))
}
