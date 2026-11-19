import {render, screen, waitFor} from '@testing-library/react'
import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {PageDataProvider} from '../../../_metronic/layout/core'
import FidelizedUsersPage, {buildCredentialsText, downloadCredentialsText, getChangedUserData, validateDocument, validateUser} from './FidelizedUsersPage'
import {listFidelizedUsers} from './services/FidelizedUsersService'
import {changeFidelizedUserPassword, createFidelizedUser, lookupFidelizedUserDocument} from './services/FidelizedUsersService'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({fire: jest.fn()}))

jest.mock('./services/FidelizedUsersService', () => ({
  changeFidelizedUserPassword: jest.fn(),
  createFidelizedUser: jest.fn(),
  deleteFidelizedUser: jest.fn(),
  generateFidelizedUserPassword: jest.fn(),
  lookupFidelizedUserDocument: jest.fn(),
  listFidelizedUsers: jest.fn(),
  toggleFidelizedUserStatus: jest.fn(),
  updateFidelizedUser: jest.fn(),
}))

const users = [
  {
    id: 1,
    nombres: 'María',
    apellidos: 'García',
    documento: '70123456',
    usuario: 'mgarcia',
    activo: true,
  },
  {
    id: 2,
    nombres: 'Ana',
    apellidos: 'Torres',
    documento: '70345678',
    usuario: 'atorres',
    activo: false,
  },
]

const renderPage = () => render(
  <PageDataProvider>
    <FidelizedUsersPage />
  </PageDataProvider>
)

describe('FidelizedUsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.setItem('data', JSON.stringify({email: 'demo@jadal.pe'}))
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {writeText: jest.fn().mockResolvedValue(undefined)},
    })
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      value: {getRandomValues: (values) => { values[0] = 1; return values }},
    })
    Object.defineProperty(window.URL, 'createObjectURL', {
      configurable: true,
      value: jest.fn().mockReturnValue('blob:credentials'),
    })
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      configurable: true,
      value: jest.fn(),
    })
    listFidelizedUsers.mockResolvedValue(users)
    lookupFidelizedUserDocument.mockResolvedValue({razonSocial: 'Empresa consultada'})
    createFidelizedUser.mockResolvedValue({
      id: 3,
      nombres: 'Empresa consultada',
      tipoDocumento: 'RUC',
      documento: '20123456789',
      usuario: 'empresa.demo',
      activo: true,
    })
    changeFidelizedUserPassword.mockResolvedValue({})
  })

  test('builds a partial update without unchanged fields or password', () => {
    expect(getChangedUserData(
      {
        nombres: 'María',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDocumento: 'DNI',
        documento: '70123456',
        usuario: 'mgarcia',
        activo: true,
      },
      {
        nombres: 'María actualizada',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDocumento: 'RUC',
        documento: '20522891739',
        usuario: 'inversiones@test.com',
        activo: false,
        password: '',
        confirmPassword: '',
      },
    )).toEqual({
      nombres: 'María actualizada',
      tipoDocumento: 'RUC',
      documento: '20522891739',
      usuario: 'inversiones@test.com',
      activo: false,
    })
  })

  test('allows any username with more than five characters', () => {
    const baseForm = {
      nombres: 'Empresa',
      tipoDocumento: 'RUC',
      documento: '20522891739',
      password: 'Seguro1!',
      confirmPassword: 'Seguro1!',
    }

    expect(validateUser({...baseForm, usuario: 'inversiones@test.com'})).toEqual({})
    expect(validateUser({...baseForm, usuario: 'abcde'}).usuario).toBe('El usuario debe tener más de 5 caracteres')
  })

  test('validates DNI and RUC lengths according to the selected type', () => {
    expect(validateDocument('DNI', '1234567')).toBe('El DNI debe tener 8 dígitos')
    expect(validateDocument('DNI', '12345678')).toBe('')
    expect(validateDocument('RUC', '2013137676')).toBe('El RUC debe tener 11 dígitos')
    expect(validateDocument('RUC', '20131376767')).toBe('')
    expect(validateDocument('RUC', '2013137676A')).toBe('El RUC solo debe contener números')
  })

  test('renders users and filters by name and document', async () => {
    renderPage()

    expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument()
    expect(await screen.findByText('María García')).toBeInTheDocument()
    expect(screen.getByText('Ana Torres')).toBeInTheDocument()

    await userEvent.type(screen.getByPlaceholderText('Buscar por nombre, documento o usuario'), 'ana')
    expect(screen.getByText('Ana Torres')).toBeInTheDocument()
    expect(screen.queryByText('María García')).not.toBeInTheDocument()

    await userEvent.clear(screen.getByPlaceholderText('Buscar por nombre, documento o usuario'))
    await userEvent.type(screen.getByPlaceholderText('Buscar por nombre, documento o usuario'), '70345678')
    expect(screen.getByText('Ana Torres')).toBeInTheDocument()
    expect(screen.queryByText('María García')).not.toBeInTheDocument()
  })

  test('opens the create user modal with required fields', async () => {
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: /nuevo usuario/i}))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Nuevo usuario Extranet')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Nombres / Razón social')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Apellido paterno')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Apellido materno')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Tipo de documento')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Tipo de documento')).toHaveValue('RUC')
    expect(within(dialog).getByLabelText('Documento')).not.toBeDisabled()
    expect(within(dialog).getByRole('button', {name: 'Consultar documento'})).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Usuario')).toBeInTheDocument()
    expect(within(dialog).getByRole('button', {name: 'Copiar usuario'})).toBeInTheDocument()
    expect(within(dialog).getByRole('button', {name: 'Copiar contraseña'})).toBeInTheDocument()
    expect(within(dialog).getByRole('button', {name: /generar contraseña/i})).toBeInTheDocument()
    expect(within(dialog).getByText('Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.')).toBeInTheDocument()
  })

  test('consults the document and fills the receiver name', async () => {
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: /nuevo usuario/i}))
    const dialog = screen.getByRole('dialog')
    await userEvent.selectOptions(within(dialog).getByLabelText('Tipo de documento'), 'RUC')
    await userEvent.type(within(dialog).getByLabelText('Documento'), '20123456789')
    await userEvent.click(within(dialog).getByRole('button', {name: 'Consultar documento'}))

    expect(lookupFidelizedUserDocument).toHaveBeenCalledWith('RUC', '20123456789')
    expect(await screen.findByDisplayValue('Empresa consultada')).toBeInTheDocument()
    expect(within(dialog).getByLabelText('Usuario')).toHaveValue('EMPRESA-CONSULTADA-0001')
  })

  test('copies the username and password from the create form', async () => {
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: /nuevo usuario/i}))
    const dialog = screen.getByRole('dialog')
    const usernameInput = within(dialog).getByLabelText('Usuario')
    await userEvent.type(usernameInput, 'nuevo.usuario')
    await userEvent.click(within(dialog).getByRole('button', {name: /generar contraseña/i}))

    const passwordInput = within(dialog).getByLabelText('Contraseña segura')
    const clipboardWrite = navigator.clipboard.writeText
    await userEvent.click(within(dialog).getByRole('button', {name: 'Copiar usuario'}))
    await userEvent.click(within(dialog).getByRole('button', {name: 'Copiar contraseña'}))

    expect(clipboardWrite).toHaveBeenNthCalledWith(1, 'nuevo.usuario')
    expect(clipboardWrite).toHaveBeenNthCalledWith(2, passwordInput.value)
  })

  test('generates a secure password and allows revealing it during registration', async () => {
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: /nuevo usuario/i}))
    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', {name: /generar contraseña/i}))

    const passwordInput = within(dialog).getByLabelText('Contraseña segura')
    const confirmPasswordInput = within(dialog).getByLabelText('Confirmar contraseña')
    expect(passwordInput).toHaveValue()
    expect(passwordInput.value).toHaveLength(12)
    expect(passwordInput).toHaveValue(confirmPasswordInput.value)
    expect(passwordInput.value).toMatch(/[A-Z]/)
    expect(passwordInput.value).toMatch(/[a-z]/)
    expect(passwordInput.value).toMatch(/[0-9]/)
    expect(passwordInput.value).toMatch(/[^A-Za-z0-9]/)
    expect(passwordInput).toHaveAttribute('type', 'password')

    await userEvent.click(within(dialog).getByRole('button', {name: 'Mostrar contraseña'}))
    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(within(dialog).getByRole('button', {name: 'Ocultar contraseña'})).toBeInTheDocument()
  })

  test('generates the password from the change-password modal', async () => {
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    const firstUserRow = screen.getByRole('row', {name: /María García/})
    await userEvent.click(within(firstUserRow).getByRole('button', {name: 'Cambiar contraseña'}))
    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', {name: /generar contraseña/i}))

    const passwordInput = within(dialog).getByLabelText('Nueva contraseña')
    expect(passwordInput.value).toHaveLength(12)
    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  test('downloads credentials using the required text filename', () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    downloadCredentialsText({
      tipoDocumento: 'RUC',
      documento: '20518633482',
      nombres: 'Empresa demo',
      usuario: 'empresa.demo',
      password: 'Password123!',
    })

    expect(click.mock.instances[0]).toHaveAttribute('download', 'extranet-20518633482.txt')
    expect(window.URL.createObjectURL).toHaveBeenCalled()
    click.mockRestore()
  })

  test('builds the final-user text with title and labeled credentials', () => {
    expect(buildCredentialsText({usuario: 'EMPRESA-DEMO-0001', password: 'Password123!'})).toBe(
      '\uFEFFJADAL GLOBAL SERVICE Portal Extranet CPE\r\n\r\nPORTAL EXTRANET: https://clientes.jadal.pe/\r\nUsuario: EMPRESA-DEMO-0001\r\nContraseña: Password123!\r\n',
    )
  })

  test('shows the backend business error in an alert and does not mark the user as saved', async () => {
    createFidelizedUser.mockRejectedValueOnce({
      statusCode: 422,
      message: {message: 'El usuario no dispone de comprobantes registrados.'},
    })
    renderPage()
    expect(await screen.findByText('María García')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', {name: /nuevo usuario/i}))
    const dialog = screen.getByRole('dialog')
    await userEvent.type(within(dialog).getByLabelText('Nombres / Razón social'), 'Empresa sin comprobantes')
    await userEvent.type(within(dialog).getByLabelText('Documento'), '20131376767')
    await userEvent.type(within(dialog).getByLabelText('Usuario'), 'empresa.demo')
    await userEvent.type(within(dialog).getByLabelText('Contraseña segura'), 'Password123!')
    await userEvent.type(within(dialog).getByLabelText('Confirmar contraseña'), 'Password123!')
    await userEvent.click(within(dialog).getByRole('button', {name: 'Guardar'}))

    await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
      icon: 'error',
      text: 'El usuario no dispone de comprobantes registrados.',
    })))
    expect(within(screen.getByRole('dialog')).getByText('Nuevo usuario Extranet')).toBeInTheDocument()
  })
})
