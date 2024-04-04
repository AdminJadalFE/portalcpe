import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'

import RegisterCompanyPage from './RegisterCompanyPage' 
import RegisterUserPage from './RegisterUserPage' 

const profileBreadCrumbs = [
  {
    title: 'Emisión de Comprobantes de Pago Electrónicos',
    path: '/empresa',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
  
const CompanyPage = () => {
  return (
      <Routes>
        <Route element={<Outlet />}>
          
        <Route
            path='registrar'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Registro de Empresa</PageTitle>
                <RegisterCompanyPage />
              </>
            }
          /> 

        <Route
            path='usuario/registrar'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Registro de Empresa</PageTitle>
                <RegisterUserPage />
              </>
            }
          />             

          
        </Route>
      </Routes>

  )
}

export default CompanyPage
