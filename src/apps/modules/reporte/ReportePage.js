import {Navigate, Routes, Route} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
 

import {ListReporte} from './busqueda/ListReporte'

import {SearchProvider} from '../cpe/busqueda/core/searchContext';
import {PortalSectionHeader} from '../../components/PortalSectionHeader';
 

const profileBreadCrumbs = [
  {
    title: 'Reporte',
    path: '/reporte/busqueda',
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
 
const ReportePage = () => {
 
    return (
    <>
      <SearchProvider>
      
        <Routes> 
            <Route
              path='busqueda'
              element={
                <>
                  <PageTitle breadcrumbs={profileBreadCrumbs}>Reportes</PageTitle>
                  <PortalSectionHeader
                    title='Reportes'
                    description='Solicitudes y descargas de reportes'
                  />
                  <ListReporte/> 
                </>
              }
            />
            <Route index element={<Navigate to='/reporte/busqueda' />} /> 
        </Routes>

      </SearchProvider>
      </>
    )
}
export default ReportePage
