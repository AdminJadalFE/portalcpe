import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
   
import {VisorPDF} from './VisorPDF' 
import {VisorXML} from './VisorXML' 
 

const profileBreadCrumbs = [
  {
    title: 'Visor',
    path: '/visor',
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
  
const VisorPage = () => {

console.log("VisorPage");

  return ( 
    <Routes>
      <Route element={<Outlet />}>
        
      <Route
          path='xml'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>
              <VisorXML />
            </>
          }
        /> 

        <Route
          path='pdf'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
              <VisorPDF /> 
            </>
          }
        />
 
        {/* <Route index element={<Navigate to='/emitidos' />} /> */}
      </Route>
    </Routes> 
  )
}

export default VisorPage
