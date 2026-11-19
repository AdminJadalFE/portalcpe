import {useEffect, useMemo, useState} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import './FidelizedUsersPage.css'
import {PortalSectionHeader} from '../../components/PortalSectionHeader'
import {PortalTableViewControl} from '../../components/PortalTableViewControl'
import {
  changeFidelizedUserPassword,
  createFidelizedUser,
  listFidelizedUsers,
  lookupFidelizedUserDocument,
  toggleFidelizedUserStatus,
  updateFidelizedUser,
} from './services/FidelizedUsersService'

const ADMIN_EMAIL = 'adm@jadalfe.pe'
const EMPTY_FORM = {
  tipoDocumento: 'RUC',
  documento: '',
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  usuario: '',
  password: '',
  confirmPassword: '',
  activo: true,
}

const DOCUMENT_LENGTHS = {DNI: 8, RUC: 11}

const validateDocument = (tipoDocumento, documento) => {
  const value = documento.trim()
  if (!tipoDocumento || !value) return ''

  const expectedLength = DOCUMENT_LENGTHS[tipoDocumento]
  if (expectedLength && !/^\d+$/.test(value)) {
    return `El ${tipoDocumento} solo debe contener números`
  }
  if (expectedLength && value.length !== expectedLength) {
    return `El ${tipoDocumento} debe tener ${expectedLength} dígitos`
  }
  return ''
}

const getChangedUserData = (selectedUser = {}, form = {}) => {
  const previousValues = {
    nombres: selectedUser.nombres || selectedUser.razonSocial || selectedUser.nombreRazonSocial || '',
    apellidoPaterno: selectedUser.apellidoPaterno || '',
    apellidoMaterno: selectedUser.apellidoMaterno || '',
    tipoDocumento: selectedUser.tipoDocumento || 'DNI',
    documento: selectedUser.documento || '',
    usuario: selectedUser.usuario || '',
    activo: selectedUser.activo !== false,
  }

  return Object.keys(previousValues).reduce((changes, field) => {
    if (form[field] !== previousValues[field]) changes[field] = form[field]
    return changes
  }, {})
}

const breadcrumbs = [
  {
    title: 'Usuarios Extranet',
    path: '/usuarios-fidelizados',
    isSeparator: false,
    isActive: false,
  },
  {title: '', path: '', isSeparator: true, isActive: false},
]

const normalizeUser = (user) => ({
  ...user,
  id: user.id ?? user._id ?? '',
  nombreRazonSocial: user.razonSocial || [user.nombres, user.apellidoPaterno, user.apellidoMaterno, user.apellidos].filter(Boolean).join(' ') || user.nombre || '',
  documento: user.documento || user.numeroDocumento || user.nroDocumento || user.dni || user.documentNumber || '',
  tipoDocumento: user.tipoDocumento || '',
  fechaCreacion: user.fechaCreacion || user.createdAt || user.fecha_creacion || '',
  fechaActualizacion: user.fechaActualizacion || user.updatedAt || user.fecha_actualizacion || '',
  activo: user.is_active !== undefined ? Boolean(user.is_active) : user.activo !== false,
})

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const formattedDate = date.toLocaleDateString('es-PE', {day: '2-digit', month: '2-digit', year: 'numeric'})
  const formattedTime = date.toLocaleTimeString('es-PE', {hour: '2-digit', minute: '2-digit', hour12: false})
  return `${formattedDate} ${formattedTime}`
}

const ResponsiveTableCell = ({label, value, className = ''}) => (
  <td data-label={label} className={className}>
    <span className='portal-table-cell-label'>{label}</span>
    <span className='portal-table-cell-value'>{value}</span>
  </td>
)

const validateUser = (form, isCreate = true) => {
  const errors = {}
  if (!form.nombres.trim()) errors.nombres = 'Los nombres son obligatorios'
  if (!form.tipoDocumento) errors.tipoDocumento = 'El tipo de documento es obligatorio'
  if (!form.documento.trim()) errors.documento = 'El documento es obligatorio'
  else {
    const documentError = validateDocument(form.tipoDocumento, form.documento)
    if (documentError) errors.documento = documentError
  }
  if (!form.usuario.trim()) errors.usuario = 'El usuario es obligatorio'
  else if (form.usuario.trim().length < 6) {
    errors.usuario = 'El usuario debe tener más de 5 caracteres'
  }
  if (isCreate) {
    const passwordError = validatePassword(form.password)
    if (passwordError) errors.password = passwordError
  }
  if (isCreate && form.password !== form.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden'
  return errors
}

const generateSecurePassword = () => {
  const characterGroups = [
    'ABCDEFGHJKLMNPQRSTUVWXYZ',
    'abcdefghijkmnopqrstuvwxyz',
    '23456789',
    '!@#$%&*',
  ]
  const alphabet = characterGroups.join('')
  const cryptoApi = window.crypto
  if (!cryptoApi?.getRandomValues) {
    throw new Error('El navegador no admite la generación segura de contraseñas')
  }
  const randomIndex = (length) => {
    const values = new Uint32Array(1)
    cryptoApi.getRandomValues(values)
    return values[0] % length
  }
  const password = characterGroups.map((group) => group[randomIndex(group.length)])
  while (password.length < 12) password.push(alphabet[randomIndex(alphabet.length)])

  for (let index = password.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1)
    const currentCharacter = password[index]
    password[index] = password[swapIndex]
    password[swapIndex] = currentCharacter
  }

  return password.join('')
}

const validatePassword = (password) => {
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
  if (!/[A-Z]/.test(password)) return 'La contraseña debe incluir una mayúscula'
  if (!/[a-z]/.test(password)) return 'La contraseña debe incluir una minúscula'
  if (!/[0-9]/.test(password)) return 'La contraseña debe incluir un número'
  if (!/[^A-Za-z0-9]/.test(password)) return 'La contraseña debe incluir un carácter especial'
  return ''
}

const sanitizeUsernamePart = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60)

const generateUsernameCode = () => {
  const cryptoApi = window.crypto
  if (!cryptoApi?.getRandomValues) {
    throw new Error('El navegador no admite la generación segura de usuarios')
  }
  const values = new Uint32Array(1)
  cryptoApi.getRandomValues(values)
  return String(values[0] % 10000).padStart(4, '0')
}

const generateUsername = (name) => {
  const base = sanitizeUsernamePart(name) || 'usuario'
  return `${base}-${generateUsernameCode()}`.toUpperCase()
}

const getCurrentEmail = () => {
  try {
    const data = JSON.parse(localStorage.getItem('data') || '{}')
    return data.email || data.usuario?.emailUsuario || ''
  } catch {
    return ''
  }
}

const showSuccess = (title) => Swal.fire({icon: 'success', title, timer: 1600, showConfirmButton: false})

const getAlertErrorMessage = (error) => {
  if (!error) return 'No se pudo completar la operación'
  if (typeof error === 'string') return error
  if (typeof error.message === 'string') return error.message
  if (typeof error.message?.message === 'string') return error.message.message
  if (typeof error.error === 'string') return error.error
  return 'No se pudo completar la operación'
}

const showError = (error) =>
  Swal.fire({icon: 'error', title: 'No se pudo completar la operación', text: getAlertErrorMessage(error)})

const getLookupValue = (data = {}, ...keys) => {
  const source = data?.content || data?.data || data
  return keys.reduce((value, key) => value || source?.[key], '')
}

const mapLookupDataToForm = (data = {}, tipoDocumento) => {
  const names = tipoDocumento === 'RUC'
    ? getLookupValue(data, 'razonSocial', 'razon_social', 'nombre_o_razon_social', 'nombre')
    : getLookupValue(data, 'nombres', 'nombreCompleto', 'nombre_completo', 'nombre')

  return {
    ...(names && {nombres: names}),
    ...(tipoDocumento === 'DNI' && {
      ...(getLookupValue(data, 'apellidoPaterno', 'apellido_paterno') && {apellidoPaterno: getLookupValue(data, 'apellidoPaterno', 'apellido_paterno')}),
      ...(getLookupValue(data, 'apellidoMaterno', 'apellido_materno') && {apellidoMaterno: getLookupValue(data, 'apellidoMaterno', 'apellido_materno')}),
    }),
  }
}

const buildCredentialsText = ({usuario, password}) =>
  `\uFEFFJADAL GLOBAL SERVICE Portal Extranet CPE\r\n\r\nUsuario: ${usuario ?? ''}\r\nContraseña: ${password ?? ''}\r\n`

const downloadCredentialsText = ({documento, usuario, password}) => {
  const safeDocument = String(documento || 'usuario').replace(/[^a-zA-Z0-9_-]/g, '') || 'usuario'
  const text = buildCredentialsText({usuario, password})
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'})
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `extranet-${safeDocument}.txt`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

const FidelizedUsersPage = () => {
  const [users, setUsers] = useState([])
  const [filters, setFilters] = useState({search: ''})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalMode, setModalMode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupError, setLookupError] = useState('')
  const [showFormPassword, setShowFormPassword] = useState(false)
  const [showFormConfirmPassword, setShowFormConfirmPassword] = useState(false)
  const [passwordUser, setPasswordUser] = useState(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [tableView, setTableView] = useState(() => {
    try {
      return window.localStorage.getItem('portalcpe-extranet-table-view') === 'scroll'
        ? 'scroll'
        : 'cards'
    } catch {
      return 'cards'
    }
  })
  const isAdmin = getCurrentEmail() === ADMIN_EMAIL

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listFidelizedUsers()
      setUsers((data || []).map(normalizeUser))
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [filters.search])

  const handleTableViewChange = (nextView) => {
    setTableView(nextView)

    try {
      window.localStorage.setItem('portalcpe-extranet-table-view', nextView)
    } catch {
      // Keep the control usable when browser storage is unavailable.
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = filters.search.trim().toLowerCase()
      if (!search) return true
      return [user.nombreRazonSocial, user.documento, user.usuario]
        .join(' ')
        .toLowerCase()
        .includes(search)
    })
  }, [filters, users])

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visibleUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openCreate = () => {
    setSelectedUser(null)
    setForm(EMPTY_FORM)
    setFormErrors({})
    setLookupError('')
    setShowFormPassword(false)
    setShowFormConfirmPassword(false)
    setModalMode('create')
  }

  const openEdit = (user) => {
    setSelectedUser(user)
    setForm({
      nombres: user.nombres || user.razonSocial || user.nombreRazonSocial || '',
      apellidoPaterno: user.apellidoPaterno || '',
      apellidoMaterno: user.apellidoMaterno || '',
      tipoDocumento: user.tipoDocumento || 'RUC',
      documento: user.documento || '',
      usuario: user.usuario || '',
      password: '',
      confirmPassword: '',
      activo: user.activo,
    })
    setFormErrors({})
    setLookupError('')
    setShowFormPassword(false)
    setShowFormConfirmPassword(false)
    setModalMode('edit')
  }

  const closeUserModal = () => {
    if (!saving) setModalMode(null)
  }

  const handleFormChange = (event) => {
    const {name, value, type, checked} = event.target
    const nextValue = type === 'checkbox' ? checked : value
    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
      ...(name === 'tipoDocumento' && {documento: ''}),
    }))
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
      ...(name === 'tipoDocumento' && {documento: ''}),
    }))
    if (name === 'tipoDocumento' || name === 'documento') setLookupError('')
  }

  const handleNamesBlur = () => {
    if (form.usuario.trim() || !form.nombres.trim()) return
    try {
      const generatedUsername = generateUsername(form.nombres)
      setForm((currentForm) => currentForm.usuario.trim()
        ? currentForm
        : {...currentForm, usuario: generatedUsername})
      setFormErrors((currentErrors) => ({...currentErrors, usuario: ''}))
    } catch (generationError) {
      showError(generationError)
    }
  }

  const handleDocumentLookup = async () => {
    setLookupError('')
    if (!form.tipoDocumento) {
      setFormErrors((currentErrors) => ({...currentErrors, tipoDocumento: 'Selecciona el tipo de documento'}))
      return
    }
    if (!form.documento.trim()) {
      setFormErrors((currentErrors) => ({...currentErrors, documento: 'El documento es obligatorio'}))
      return
    }
    const documentError = validateDocument(form.tipoDocumento, form.documento)
    if (documentError) {
      setFormErrors((currentErrors) => ({...currentErrors, documento: documentError}))
      return
    }

    setLookupLoading(true)
    try {
      const data = await lookupFidelizedUserDocument(form.tipoDocumento, form.documento)
      const mappedData = mapLookupDataToForm(data, form.tipoDocumento)
      if (!mappedData.nombres && !mappedData.apellidoPaterno && !mappedData.apellidoMaterno) {
        throw new Error('No se encontraron datos para el documento consultado')
      }
      const generatedUsername = !form.usuario.trim() && mappedData.nombres
        ? generateUsername(mappedData.nombres)
        : ''
      setForm((currentForm) => ({
        ...currentForm,
        ...mappedData,
        ...(generatedUsername && !currentForm.usuario.trim() && {usuario: generatedUsername}),
      }))
      setFormErrors((currentErrors) => ({...currentErrors, tipoDocumento: '', documento: ''}))
    } catch (lookupException) {
      setLookupError(lookupException.message)
    } finally {
      setLookupLoading(false)
    }
  }

  const copyValue = async (value, label) => {
    if (!value) return
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = value
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
      }
      await showSuccess(`${label} copiado`)
    } catch (copyError) {
      showError(copyError)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = validateUser(form, modalMode === 'create')
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setSaving(true)
    try {
      const operation = modalMode
      const userData = operation === 'create' ? {...form} : getChangedUserData(selectedUser, form)
      const savedUser = operation === 'create'
        ? await createFidelizedUser(userData)
        : await updateFidelizedUser({...userData, id: selectedUser.id})
      const normalizedUser = normalizeUser(savedUser)
      if (operation === 'create') {
        downloadCredentialsText({
          tipoDocumento: form.tipoDocumento,
          documento: form.documento,
          nombres: form.nombres,
          usuario: form.usuario,
          password: form.password,
        })
      }
      setUsers((currentUsers) => operation === 'create'
        ? [...currentUsers, normalizedUser]
        : currentUsers.map((user) => user.id === normalizedUser.id ? normalizedUser : user))
      setModalMode(null)
      await showSuccess(operation === 'create' ? 'Usuario creado' : 'Usuario actualizado')
    } catch (saveError) {
      showError(saveError)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (user) => {
    const nextStatus = !user.activo
    const result = await Swal.fire({
      icon: 'question',
      title: `${nextStatus ? '¿Activar' : '¿Desactivar'} usuario?`,
      text: user.nombreRazonSocial,
      showCancelButton: true,
      confirmButtonText: nextStatus ? 'Activar' : 'Desactivar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return

    try {
      const updatedUser = normalizeUser(await toggleFidelizedUserStatus(user.id, nextStatus))
      setUsers((currentUsers) => currentUsers.map((item) => item.id === user.id ? updatedUser : item))
      await showSuccess(nextStatus ? 'Usuario activado' : 'Usuario desactivado')
    } catch (statusError) {
      showError(statusError)
    }
  }

  const openPasswordModal = (user) => {
    setPasswordUser(user)
    setPassword('')
    setShowPassword(false)
    setPasswordError('')
  }

  const handleGenerateFormPassword = () => {
    try {
      const generatedPassword = generateSecurePassword()
      setForm((currentForm) => ({
        ...currentForm,
        password: generatedPassword,
        confirmPassword: generatedPassword,
      }))
      setFormErrors((currentErrors) => ({...currentErrors, password: '', confirmPassword: ''}))
    } catch (generationError) {
      showError(generationError)
    }
  }

  const handleGenerateChangePassword = () => {
    try {
      setPassword(generateSecurePassword())
      setShowPassword(true)
      setPasswordError('')
    } catch (generationError) {
      showError(generationError)
    }
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    const error = validatePassword(password)
    if (error) {
      setPasswordError(error)
      return
    }
    try {
      await changeFidelizedUserPassword(passwordUser.id, password)
      downloadCredentialsText({
        tipoDocumento: passwordUser.tipoDocumento,
        documento: passwordUser.documento,
        nombres: passwordUser.nombreRazonSocial,
        usuario: passwordUser.usuario,
        password,
      })
      setPasswordUser(null)
      await showSuccess('Contraseña actualizada')
    } catch (passwordErrorValue) {
      showError(passwordErrorValue)
    }
  }

  if (isAdmin) {
    return <div className='alert alert-info'>Este módulo está disponible para usuarios no administradores.</div>
  }

  return (
    <>
      <PortalSectionHeader
        title='Usuarios Extranet'
        description='Administra los accesos de los usuarios de la extranet'
      />
      <PageTitle breadcrumbs={breadcrumbs}>Usuarios Extranet</PageTitle>
      <div className='fidelized-users-page portal-user-management-page'>
        <div className='card mb-5 mb-xl-8 portal-cpe-list portal-user-management-card'>
        <div className='card-header border-0 pt-5'>
          <div className='portal-user-management-heading'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Usuarios Extranet</span>
              <span className='text-muted mt-1 fw-semibold fs-7'>
                {filteredUsers.length} usuarios encontrados
              </span>
            </h3>
          </div>
          <div className='portal-user-management-header-tools'>
            <PortalTableViewControl value={tableView} onChange={handleTableViewChange}/>
            <div className='card-toolbar'>
              <button type='button' className='btn btn-dark portal-user-management-create' onClick={openCreate}>
                <i className='bi bi-plus-lg me-2' /> Nuevo usuario
              </button>
            </div>
          </div>
        </div>

        <div className='card-body py-3 portal-cpe-table-body portal-user-management-body'>
          <div className='row g-4 mb-6'>
            <div className='col-md-9'>
              <label htmlFor='fidelized-user-search-filter' className='form-label fw-semibold'>Buscar usuario</label>
              <input
                id='fidelized-user-search-filter'
                type='search'
                className='form-control'
                value={filters.search}
                onChange={(event) => setFilters({search: event.target.value})}
                placeholder='Buscar por nombre, documento o usuario'
              />
            </div>
            <div className='col-md-3 d-flex align-items-end'>
              <button type='button' className='btn w-100 fidelized-users-refresh' onClick={loadUsers} disabled={loading}>
                <i className='bi bi-arrow-clockwise me-2' /> Actualizar
              </button>
            </div>
          </div>

          {loading && <div className='text-center py-10'>Cargando usuarios...</div>}
          {!loading && error && (
            <div className='alert alert-danger d-flex justify-content-between align-items-center'>
              <span>{error}</span>
              <button type='button' className='btn btn-sm btn-danger' onClick={loadUsers}>Reintentar</button>
            </div>
          )}
          {!loading && !error && (
            <>
              <div className={`table-responsive portal-cpe-table-wrap ${tableView === 'scroll' ? 'portal-cpe-table-wrap--scroll' : ''}`}>
                <table className='align-middle table-row-dashed dataTable no-footer'>
                  <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                      <th>Nombres / Razón social</th>
                      <th>Documento</th>
                      <th>Usuario</th>
                      <th className='fidelized-date-column'>Fecha de creación</th>
                      <th className='fidelized-date-column'>Fecha de actualización</th>
                      <th className='fidelized-status-header'>Estado</th>
                      <th className='text-end'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-600'>
                    {visibleUsers.map((user) => (
                      <tr key={user.id}>
                        <ResponsiveTableCell
                          label='Nombres / Razón social'
                          value={(
                            <div className='d-flex flex-column'>
                              <span className='text-gray-800 fw-bold'>{user.nombreRazonSocial}</span>
                            </div>
                          )}
                        />
                        <ResponsiveTableCell label='Documento' value={user.documento || '—'} />
                        <ResponsiveTableCell label='Usuario' value={user.usuario} />
                        <ResponsiveTableCell label='Fecha de creación' value={formatDate(user.fechaCreacion)} className='fidelized-date-cell text-nowrap' />
                        <ResponsiveTableCell label='Fecha de actualización' value={formatDate(user.fechaActualizacion)} className='fidelized-date-cell text-nowrap' />
                        <td data-label='Estado' className='fidelized-status-cell'>
                          <span className='portal-table-cell-label'>Estado</span>
                          <span className='portal-table-cell-value'>
                          <div className='d-flex align-items-center gap-2'>
                            <div className='form-check form-switch mb-0'>
                              <input
                                className='form-check-input fidelized-user-status-switch'
                                type='checkbox'
                                checked={user.activo}
                                onChange={() => handleToggleStatus(user)}
                                aria-label={user.activo ? 'Desactivar usuario' : 'Activar usuario'}
                              />
                            </div>
                            <span className={`badge ${user.activo ? 'badge-light-success' : 'badge-light-danger'}`}>
                              {user.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          </span>
                        </td>
                        <td data-label='Acciones' className='fidelized-actions-cell text-end'>
                          <span className='portal-table-cell-label'>Acciones</span>
                          <span className='portal-table-cell-value'>
                          <div className='d-flex justify-content-end gap-1 flex-wrap'>
                            <button type='button' className='btn btn-icon btn-sm fidelized-user-action fidelized-user-action--edit' aria-label='Editar usuario' title='Editar' onClick={() => openEdit(user)}>
                              <i className='bi bi-pencil' />
                            </button>
                            <button type='button' className='btn btn-icon btn-sm fidelized-user-action fidelized-user-action--password' aria-label='Cambiar contraseña' title='Cambiar contraseña' onClick={() => openPasswordModal(user)}>
                              <i className='bi bi-key' />
                            </button>
                          </div>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {visibleUsers.length === 0 && (
                      <tr>
                        <td colSpan='7' className='text-center py-10'>No se han encontrado usuarios.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <br></br>
              <div className='row'>
                <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
                <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                  <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                      <li className='page-item'>
                        <button type='button' className='page-link' style={{cursor: 'pointer'}} onClick={() => setPage(1)} disabled={currentPage === 1}>{'<<'}</button>&nbsp;
                      </li>
                      <li className='page-item'>
                        <button type='button' className='page-link' style={{cursor: 'pointer'}} onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>Anterior</button>&nbsp;
                      </li>
                      <li className='page-item'>
                        <button type='button' className='page-link' style={{cursor: 'pointer'}} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={currentPage === pageCount}>Siguiente</button>&nbsp;
                      </li>
                      <li className='page-item'>
                        <button type='button' className='page-link' style={{cursor: 'pointer'}} onClick={() => setPage(pageCount)} disabled={currentPage === pageCount}>{'>>'}</button>&nbsp;
                      </li>
                      <li className='page-item'>
                        <span className='page-link' style={{cursor: 'pointer'}}> Página &nbsp; <strong>{currentPage} de {pageCount}</strong>&nbsp;</span>&nbsp;
                      </li>
                      <li className='page-item'>
                        <select className='page-link' value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}>
                          {[10, 25, 50].map((size) => (
                            <option className='page-link' key={size} value={size}>Mostrar {size}</option>
                          ))}
                        </select>&nbsp;
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>

      {modalMode && <Modal show onHide={closeUserModal} centered dialogClassName='fidelized-users-modal'>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === 'create' ? 'Nuevo usuario Extranet' : 'Editar usuario Extranet'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='alert alert-light-primary d-flex align-items-center mb-6'>
              <i className='bi bi-shield-lock fs-2x me-3' />
              <span>Registra los datos de acceso del usuario Extranet. Tu contraseña se protege de forma segura.</span>
            </div>
            <div className='row g-4 mb-4'>
              <div className='col-md-5'>
                <label htmlFor='fidelized-user-document-type' className='form-label required'>Tipo de documento</label>
                <div className='fidelized-document-type-select'>
                  <select id='fidelized-user-document-type' name='tipoDocumento' className={`form-select ${formErrors.tipoDocumento ? 'is-invalid' : ''}`} value={form.tipoDocumento} onChange={handleFormChange}>
                    <option value=''>Selecciona un tipo</option>
                    <option value='DNI'>DNI</option>
                    <option value='RUC'>RUC</option>
                    <option value='CE'>CE</option>
                    <option value='PASAPORTE'>Pasaporte</option>
                  </select>
                  <i className='bi bi-chevron-down fidelized-document-type-select-icon' aria-hidden='true' />
                </div>
                {formErrors.tipoDocumento && <div className='invalid-feedback'>{formErrors.tipoDocumento}</div>}
              </div>
              <div className='col-md-7'>
                <label htmlFor='fidelized-user-document' className='form-label required'>Documento</label>
                <div className='input-group'>
                  <input
                    id='fidelized-user-document'
                    name='documento'
                    className={`form-control ${formErrors.documento ? 'is-invalid' : ''}`}
                    value={form.documento}
                    onChange={handleFormChange}
                    disabled={!form.tipoDocumento}
                    maxLength={DOCUMENT_LENGTHS[form.tipoDocumento] || 20}
                    inputMode={['DNI', 'RUC'].includes(form.tipoDocumento) ? 'numeric' : 'text'}
                  />
                  <button type='button' className='btn btn-light-primary' aria-label='Consultar documento' title='Consultar documento' onClick={handleDocumentLookup} disabled={lookupLoading || !form.tipoDocumento}>
                    <i className={`bi ${lookupLoading ? 'bi-hourglass-split' : 'bi-search'}`} />
                  </button>
                </div>
                {formErrors.documento && <div className='invalid-feedback d-block'>{formErrors.documento}</div>}
                {lookupError && <div className='invalid-feedback d-block'>{lookupError}</div>}
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='fidelized-user-names' className='form-label required'>Nombres / Razón social</label>
              <input id='fidelized-user-names' name='nombres' className={`form-control ${formErrors.nombres ? 'is-invalid' : ''}`} value={form.nombres} onChange={handleFormChange} onBlur={handleNamesBlur} />
              {formErrors.nombres && <div className='invalid-feedback'>{formErrors.nombres}</div>}
            </div>
            <div className='row g-4 mb-4'>
              <div className='col-md-6'>
                <label htmlFor='fidelized-user-last-name' className='form-label'>Apellido paterno</label>
                <input id='fidelized-user-last-name' name='apellidoPaterno' className='form-control' value={form.apellidoPaterno} onChange={handleFormChange} />
              </div>
              <div className='col-md-6'>
                <label htmlFor='fidelized-user-second-last-name' className='form-label'>Apellido materno</label>
                <input id='fidelized-user-second-last-name' name='apellidoMaterno' className='form-control' value={form.apellidoMaterno} onChange={handleFormChange} />
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='fidelized-user-username' className='form-label required'>Usuario</label>
              <div className='input-group'>
                <input id='fidelized-user-username' name='usuario' className={`form-control ${formErrors.usuario ? 'is-invalid' : ''}`} value={form.usuario} onChange={handleFormChange} placeholder='Ejemplo: mgarcia' />
                <button type='button' className='btn btn-light' aria-label='Copiar usuario' title='Copiar usuario' onClick={() => copyValue(form.usuario, 'Usuario')} disabled={!form.usuario}>
                  <i className='bi bi-clipboard' />
                </button>
              </div>
              {formErrors.usuario && <div className='invalid-feedback'>{formErrors.usuario}</div>}
            </div>
            {modalMode === 'create' && (
              <>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <label htmlFor='fidelized-user-create-password' className='form-label required'>Contraseña segura</label>
                    <button type='button' className='btn btn-sm btn-light-primary mb-2' onClick={handleGenerateFormPassword}>
                      <i className='bi bi-shuffle me-1' /> Generar contraseña
                    </button>
                  </div>
                  <div className='input-group'>
                    <input id='fidelized-user-create-password' name='password' type={showFormPassword ? 'text' : 'password'} className={`form-control ${formErrors.password ? 'is-invalid' : ''}`} value={form.password} onChange={handleFormChange} />
                    <button type='button' className='btn btn-light' aria-label={showFormPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} title={showFormPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowFormPassword((visible) => !visible)}>
                      <i className={`bi ${showFormPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                    </button>
                    <button type='button' className='btn btn-light' aria-label='Copiar contraseña' title='Copiar contraseña' onClick={() => copyValue(form.password, 'Contraseña')} disabled={!form.password}>
                      <i className='bi bi-clipboard' />
                    </button>
                  </div>
                  <small className='form-text text-muted d-block mt-1'>Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.</small>
                  {formErrors.password && <div className='invalid-feedback'>{formErrors.password}</div>}
                </div>
                <div className='mb-4'>
                  <label htmlFor='fidelized-user-confirm-password' className='form-label required'>Confirmar contraseña</label>
                  <div className='input-group'>
                    <input id='fidelized-user-confirm-password' name='confirmPassword' type={showFormConfirmPassword ? 'text' : 'password'} className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`} value={form.confirmPassword} onChange={handleFormChange} />
                    <button type='button' className='btn btn-light' aria-label={showFormConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'} title={showFormConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'} onClick={() => setShowFormConfirmPassword((visible) => !visible)}>
                      <i className={`bi ${showFormConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                    </button>
                  </div>
                  {formErrors.confirmPassword && <div className='invalid-feedback'>{formErrors.confirmPassword}</div>}
                </div>
              </>
            )}
            <div className='form-check form-switch'>
              <input id='fidelized-user-active' name='activo' type='checkbox' className='form-check-input' checked={form.activo} onChange={handleFormChange} />
              <label htmlFor='fidelized-user-active' className='form-check-label'>Usuario activo</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type='button' className='btn btn-light' onClick={closeUserModal} disabled={saving}>Cancelar</button>
            <button type='submit' className='btn btn-primary' disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
          </Modal.Footer>
        </form>
      </Modal>}

      {passwordUser && <Modal show onHide={() => setPasswordUser(null)} centered dialogClassName='fidelized-users-modal'>
        <form onSubmit={handlePasswordSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='text-muted'>Usuario: {passwordUser?.usuario}</p>
            <div className='d-flex justify-content-between align-items-center'>
              <label htmlFor='fidelized-user-password' className='form-label required'>Nueva contraseña</label>
              <button type='button' className='btn btn-sm btn-light-primary mb-2' onClick={handleGenerateChangePassword}>
                <i className='bi bi-shuffle me-1' /> Generar contraseña
              </button>
            </div>
            <div className='input-group'>
              <input id='fidelized-user-password' type={showPassword ? 'text' : 'password'} className={`form-control ${passwordError ? 'is-invalid' : ''}`} value={password} onChange={(event) => {setPassword(event.target.value); setPasswordError('')}} />
              <button type='button' className='btn btn-light' aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword((visible) => !visible)}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
              <button type='button' className='btn btn-light' aria-label='Copiar contraseña' title='Copiar contraseña' onClick={() => copyValue(password, 'Contraseña')} disabled={!password}>
                <i className='bi bi-clipboard' />
              </button>
            </div>
            {passwordError && <div className='invalid-feedback'>{passwordError}</div>}
          </Modal.Body>
          <Modal.Footer>
            <button type='button' className='btn btn-light' onClick={() => setPasswordUser(null)}>Cancelar</button>
            <button type='submit' className='btn btn-primary'>Actualizar contraseña</button>
          </Modal.Footer>
        </form>
      </Modal>}
    </>
  )
}

export {buildCredentialsText, FidelizedUsersPage, downloadCredentialsText, getChangedUserData, validateDocument, validateUser}
export default FidelizedUsersPage
