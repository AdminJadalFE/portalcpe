import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {EmisionProvider} from './core/EmisionContext';
import FacturaPage from './FacturaPage' 
import BoletaPage from './BoletaPage' 
import NotaCreditoPage from './NotaCreditoPage' 
import SeriePage from './SeriePage' 

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

        <Route
            path='boleta'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
                <BoletaPage />
              </>
            }
          />  

        <Route
            path='notacredito'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
                <NotaCreditoPage />
              </>
            }
          />  

        <Route
            path='serie'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
                <SeriePage />
              </>
            }
          />  
          
        </Route>
      </Routes>
    </EmisionProvider>
  )
}

export default EmisionPage
