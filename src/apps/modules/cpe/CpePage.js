import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {CpeHeaderSearch} from './CpeHeaderSearch'
import {CpeHeaderOption} from './CpeHeaderOption'

import {ListCpe} from './busqueda/ListCpe'

import {SearchProvider} from './busqueda/core/searchContext';
 

const profileBreadCrumbs = [
  {
    title: 'Busqueda',
    path: '/cpe/busqueda',
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
 
const CpePage = () => (
<>
  <SearchProvider>
  
    <Routes>
      <Route
        element={
          <>
            <CpeHeaderOption />
            <CpeHeaderSearch />
            <Outlet />
          </>
        }
      >
        <Route
          path='/busqueda'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
              <ListCpe /> 
            </>
          }
        />
        <Route index element={<Navigate to='/cpe/busqueda' />} />
      </Route>
    </Routes>

  </SearchProvider>
  </>
)

export default CpePage
