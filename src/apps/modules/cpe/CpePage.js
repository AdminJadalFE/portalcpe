import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
 
import CpeList from './CpeList'
import CpeResume from './CpeResume'

import {SearchProvider} from './busqueda/core/searchContext';
 

const profileBreadCrumbs = [
  {
    title: 'Comprobantes de Pago Electrónicos',
    path: '/cpe',
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
  
const CpePage = () => {
  return (
    <SearchProvider>
    <Routes>
      <Route element={<Outlet />}>
        
      <Route
          path='emitidos'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
              <CpeResume />
            </>
          }
        /> 

        <Route
          path='busqueda'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
              <CpeList /> 
            </>
          }
        />
 
        {/* <Route index element={<Navigate to='/emitidos' />} /> */}
      </Route>
    </Routes>
    </SearchProvider>
  )
}

export default CpePage
