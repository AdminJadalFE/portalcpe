import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ResumenHeaderSearch} from './ResumenHeaderSearch'
import {ResumenHeaderOption} from './ResumenHeaderOption'

import {ListResumen} from './busqueda/ListResumen'

import {ResumenProvider} from './busqueda/core/resumenContext';
 

const profileBreadCrumbs = [
  {
    title: 'Busqueda',
    path: '/resumen/busqueda',
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
 
const ResumenPage = ({tipoCpe}) => {
 
    return (
    <>
      <ResumenProvider>
      
        <Routes>
          <Route
            element={
              <>
                {/* <CpeHeaderOption /> */}
                <ResumenHeaderSearch tipoCpe = {tipoCpe} />
                <Outlet />
              </>
            }
          >
            <Route
              path='/busqueda'
              element={
                <>
                  <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
                  <ListResumen tipoCpe = {tipoCpe}/> 
                </>
              }
            />
            <Route index element={<Navigate to='/resumen/busqueda' />} />
          </Route>
        </Routes>

      </ResumenProvider>
      </>
    )
}
export default ResumenPage
