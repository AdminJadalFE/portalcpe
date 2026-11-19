import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {UserActionsCell} from './UserActionsCell'

jest.mock('../../../../../_metronic/assets/ts/components', () => ({
  MenuComponent: {reinitialization: jest.fn()},
}))

jest.mock('../../../../../_metronic/helpers', () => ({
  KTSVG: () => null,
}))

jest.mock('../services/CpeService', () => ({
  ResendCpe: jest.fn(),
  SendEmail: jest.fn(),
}))

jest.mock('sweetalert2', () => ({fire: jest.fn()}))

describe('UserActionsCell', () => {
  test('renders a CPE without a PDF URL without throwing', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <UserActionsCell cpe={{id: 'dev-cpe-001'}} />
        </MemoryRouter>
      )
    }).not.toThrow()

    expect(screen.getByText('Opciones')).toBeInTheDocument()
    expect(screen.queryByText('Visualizar PDF')).not.toBeInTheDocument()
  })

  test('keeps the PDF viewer action when the URL is available', () => {
    render(
      <MemoryRouter>
        <UserActionsCell cpe={{id: 'dev-cpe-001', urlPdf: 'https://example.test/document.pdf'}} />
      </MemoryRouter>
    )

    expect(screen.getByTitle('Visualizar PDF')).toHaveAttribute('href', '/visorpdf/document.pdf')
  })
})
