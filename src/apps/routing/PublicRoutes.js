import {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'  
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils' 

import {VisorPDF} from '../modules/visor/VisorPDF' 
import {VisorXML} from '../modules/visor/VisorXML' 
 

const PublicRoutes = () => {

  console.log("object");

  const VisorPage = lazy(() => import('../modules/visor/VisorPage'))  
 
  return ( 
      <Routes>  
        {/* <Route path='visor/*' element={<SuspensedView><VisorPage /></SuspensedView>}/>   */}

        <Route path='visorpdf' element={<VisorPDF />} />  
        <Route path='visorxml' element={<VisorXML />} />  
      </Routes> 
  )
}

const SuspensedView = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

 
export {PublicRoutes}
