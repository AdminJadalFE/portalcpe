import {Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {CpeResumeHeaderSearch} from './CpeResumeHeaderSearch'  
import {ResumeCpe} from './resumen/ResumeCpe'
  
const profileBreadCrumbs = [
  {
    title: 'Resumen',
    path: '/cpe/emitidos',
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
 
const CpeResume = () => (
<> 
    <CpeResumeHeaderSearch />
    <Outlet /> 
    <PageTitle breadcrumbs={profileBreadCrumbs}>Resumen</PageTitle>  
    <ResumeCpe />  
  </>
)

export default CpeResume
