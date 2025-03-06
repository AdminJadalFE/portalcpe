import {Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {CpeHeaderSearch} from './CpeHeaderSearch'
import {CpeHeaderOption} from './CpeHeaderOption'

import {ListCpe} from './busqueda/ListCpe'
 
 

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
 
const CpeList = () => (
<> 
    {/* <CpeHeaderOption /> */}
    <CpeHeaderSearch />
    <Outlet /> 
    <PageTitle breadcrumbs={profileBreadCrumbs}>Busqueda</PageTitle>  
    <ListCpe />   
</>
)

export default CpeList
