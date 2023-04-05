import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {EmisionProvider} from './core/EmisionContext';
import FacturaPage from './FacturaPage' 

const profileBreadCrumbs = [
  {
    title: 'Emisión de Comprobantes de Pago Electrónicos',
    path: '/emision',
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
  
const EmisionPage = () => {
  return (
    <EmisionProvider>
      <Routes>
        <Route element={<Outlet />}>
          
        <Route
            path='factura'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
                <FacturaPage />
              </>
            }
          /> 
    
    
        </Route>
      </Routes>
    </EmisionProvider>
  )
}

export default EmisionPage
