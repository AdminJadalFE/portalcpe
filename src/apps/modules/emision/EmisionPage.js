import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {EmisionProvider} from './core/EmisionContext';
import FacturaPage from './FacturaPage' 
import BoletaPage from './BoletaPage' 
import GuiaPage from './GuiaPage' 
import NotaCreditoPage from './NotaCreditoPage' 
import SeriePage from './SeriePage' 
import {PortalSectionHeader} from '../../components/PortalSectionHeader';

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
      <PortalSectionHeader
        title='Emisión Web'
        description='Generación de comprobantes electrónicos'
      />
      <Routes>
        <Route element={<Outlet />}>
          
        <Route
            path='factura'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Emisión Web</PageTitle>
                <FacturaPage />
              </>
            }
          />  

        <Route
            path='boleta'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Emisión Web</PageTitle>
                <BoletaPage />
              </>
            }
          />  

        <Route
            path='notacredito'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Emisión Web</PageTitle>
                <NotaCreditoPage />
              </>
            }
          />  

        <Route
            path='guia'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Emisión Web</PageTitle>
                <GuiaPage />
              </>
            }
          />  

        <Route
            path='serie'
            element={
              <>
                <PageTitle breadcrumbs={profileBreadCrumbs}>Emisión Web</PageTitle>
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
