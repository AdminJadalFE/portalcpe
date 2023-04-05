import {Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core' 

import {DatosEmisor} from './components/DatosEmisor'
import {DatosReceptor} from './components/DatosReceptor'
  
const profileBreadCrumbs = [
  {
    title: 'Busqueda',
    path: '/emision/factura',
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
    <Outlet /> 
    <PageTitle breadcrumbs={profileBreadCrumbs}>Emision de Factura Electrónica</PageTitle>   

    <DatosEmisor />
    <DatosEmisor />
</>
)

export default CpeList
