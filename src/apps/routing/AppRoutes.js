import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'  
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../../App'

import {VisorPDF} from '../modules/visor/VisorPDF' 
import {VisorTraza} from '../modules/visor/VisorTraza' 
 
 
const AppRoutes = () => {
  const {currentUser} = useAuth()
 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}> 
          <Route path='logout' element={<Logout />} />
          <Route path='visorpdf/:id' element={<VisorPDF />} />   
          <Route path='visortraza/:id' element={<VisorTraza />} />   
 
          {currentUser ? (
            <>

              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>

              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}