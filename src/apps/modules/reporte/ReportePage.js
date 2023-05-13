import {Navigate, Routes, Route} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
 

import {ListReporte} from './busqueda/ListReporte'

import {SearchProvider} from '../cpe/busqueda/core/searchContext';
 

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
                  <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
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
