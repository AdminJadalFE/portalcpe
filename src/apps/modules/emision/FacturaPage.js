import {Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core' 
import { useForm } from "react-hook-form"; 

import {DatosEmisor} from './components/DatosEmisor'
import {DatosReceptor} from './components/DatosReceptor'
import { DatosEmision } from './components/DatosEmision'
import { DatosDetalle } from './components/DatosDetalle'
import { DatosTotales } from './components/DatosTotales';


import {useEmision} from './core/EmisionContext';
  
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
 
const CpeList = () => {
  
  let { register, handleSubmit } = useForm();   

  const { datosCpe,datosReceptor,datosItem} = useEmision();

  const manejarSubmit = async (data) => {   
  
    console.log(datosCpe);
    console.log(datosReceptor);
    console.log(datosItem);
   
  }

    return (
    <>  
        <Outlet /> 
        <PageTitle breadcrumbs={profileBreadCrumbs}>Emision de Factura Electrónica</PageTitle>   


        

        <DatosEmisor />
        <DatosEmision />
        <DatosReceptor />
        <DatosDetalle /> 
        <DatosTotales />

        <form onSubmit={handleSubmit(manejarSubmit)}>
        
          <div className='fs-4 text-gray-800 d-flex justify-content-end mt-4'>
            <label className='d-flex align-items-center form-label mb-3 invisible'>
              .
            </label>
            <button type="submit" className="btn btn-dark mb-1 w-250px">Emitir</button>
          </div>   

        </form>

    </>
    )
  }
export default CpeList
