import {lazy, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'  
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils' 
 
 
const PrivateRoutes = () => {

  const CpePage = lazy(() => import('../modules/cpe/CpePage'))  
  const ResumenPage = lazy(() => import('../modules/resumen/ResumenPage'))   
  const EmisionPage = lazy(() => import('../modules/emision/EmisionPage'))   
  const ReportePage = lazy(() => import('../modules/reporte/ReportePage'))   
  const CompanyPage = lazy(() => import('../modules/company/CompanyPage'))   
 
  return (

      <Routes>
        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path='auth/*' element={<Navigate to='/dashboard' />} />
          {/* Pages */}
          <Route path='dashboard' element={<DashboardWrapper />} />  
          {/* Lazy Modules */} 
          <Route path='cpe/*' element={<SuspensedView><CpePage /></SuspensedView>}/> 
          <Route path='baja/*' element={<SuspensedView><ResumenPage tipoCpe="RA"/></SuspensedView>}/> 
          <Route path='resumen/*' element={<SuspensedView><ResumenPage tipoCpe="RC"/></SuspensedView>}/> 
          <Route path='emision/*' element={<SuspensedView><EmisionPage/></SuspensedView>}/> 
          <Route path='reporte/*' element={<SuspensedView><ReportePage/></SuspensedView>}/> 
          <Route path='empresa/*' element={<SuspensedView><CompanyPage/></SuspensedView>}/> 

          <Route path='*' element={<Navigate to='/error/404' />} />
        </Route>
  
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

export {PrivateRoutes}
