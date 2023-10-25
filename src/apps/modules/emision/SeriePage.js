/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useContext} from 'react';  
import { useForm } from "react-hook-form";   
import {getSerie, CreateSerie, UpdateSerie} from './services/EmisionService';  
import {useAuth} from '../auth';
import Swal from 'sweetalert2';

const SeriePage = () => {
 
  const {currentEmisor} = useAuth(); 

  const [ dataSerie, setDataSerie ] = useState();
  const [ serie, setSerie ] = useState('');
  const [ numeroFactura, setNumeroFactura ] = useState('');
  const [ numeroBoleta, setNumeroBoleta ] = useState('');
  const [ numeroNotaCreditoBoleta, setNumeroNotaCreditoBoleta ] = useState('');
  const [ numeroNotaCreditoFactura, setNumeroNotaCreditoFactura ] = useState('');


  const serieSet = (event) => { 
    setSerie(event.target.value) 
  };

  const numeroFacturaSet = (event) => { 
    setNumeroFactura(event.target.value) 
  };

  const numeroBoletaSet = (event) => { 
    setNumeroBoleta(event.target.value) 
  };

  const numeroNotaCreditoBoletaSet = (event) => { 
    setNumeroNotaCreditoBoleta(event.target.value) 
  };

  const numeroNotaCreditoFacturaSet = (event) => { 
    setNumeroNotaCreditoFactura(event.target.value) 
  };

 
  let { register, handleSubmit } = useForm();  
 
  const manejarSubmit = async () => {   
 
    let rucEmisor = currentEmisor.rucEmisor; 

    let serieEmisor = {
      rucEmisor: rucEmisor,
      serie: serie,
      numeroFactura: numeroFactura,
      numeroBoleta: numeroBoleta,
      numeroNotaCreditoBoleta: numeroNotaCreditoBoleta,
      numeroNotaCreditoFactura: numeroNotaCreditoFactura
    }
     
    const serieVal = await getSerie({rucEmisor:currentEmisor.rucEmisor});

    let strMensaje='';
    if(serieVal){
      await UpdateSerie(serieEmisor)
      strMensaje = 'La Serie fue actualizada correctamente';
    }else{
      await CreateSerie(serieEmisor)
      strMensaje = 'La Serie fue registrada correctamente';
    }

    Swal.fire({
      icon: "success",
      title: strMensaje,
      showConfirmButton: false,
      timer: 5000
    })  
  
  }
 
  const getSerieEmisor = async () => { 
    const serieEmisor = await getSerie({rucEmisor:currentEmisor.rucEmisor});

    if(serieEmisor){
      setDataSerie(serieEmisor)
      setSerie(serieEmisor.serie);
      setNumeroFactura(serieEmisor.numeroFactura);
      setNumeroBoleta(serieEmisor.numeroBoleta);
      setNumeroNotaCreditoBoleta(serieEmisor.numeroNotaCreditoBoleta);
      setNumeroNotaCreditoFactura(serieEmisor.numeroNotaCreditoFactura);
    }
 
  };

  useEffect(() => {   
    getSerieEmisor()
  }, [])  

  return (
    <div className='card mb-2 mb-xl-5'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
        <form onSubmit={handleSubmit(manejarSubmit)}>  
        <div className='mb-2 fv-row'> 

          <div className='row mb-2' data-kt-buttons='true'>
                   
            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Serie
              </label>
              <input
                type='text'
                data-kt-user-table-filter='search'
                id="serie"
                name="serie" 
                className='form-control form-control-solid w-200px form-control-sm'
                value={serie}
                onChange={serieSet}
              /> 
            </div>     
  
            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Número Factura
              </label>
              <input
                type='number'
                data-kt-user-table-filter='search'
                id="numeroFactura"
                name="numeroFactura" 
                className='form-control form-control-solid w-200px form-control-sm'
                value={numeroFactura}
                onChange={numeroFacturaSet}
              /> 
            </div>     

            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Número Boleta
              </label>
              <input
                type='number'
                data-kt-user-table-filter='search'
                id="numeroBoleta"
                name="numeroBoleta" 
                className='form-control form-control-solid w-200px form-control-sm'
                value={numeroBoleta}
                onChange={numeroBoletaSet}
              /> 
            </div>     

            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Número Nota Crédito Factura
              </label>
              <input
                type='number'
                data-kt-user-table-filter='search'
                id="numeroNotaCreditoBoleta"
                name="numeroNotaCreditoBoleta" 
                className='form-control form-control-solid w-200px form-control-sm'
                value={numeroNotaCreditoFactura}
                onChange={numeroNotaCreditoFacturaSet}
              /> 
            </div>    

            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Número Nota Crédito Boleta
              </label>
              <input
                type='number'
                data-kt-user-table-filter='search'
                id="numeroNotaCreditoFactura"
                name="numeroNotaCreditoFactura" 
                className='form-control form-control-solid w-200px form-control-sm' 
                value={numeroNotaCreditoBoleta}
                onChange={numeroNotaCreditoBoletaSet}
              /> 
            </div>     
  
          </div> 


          <div className='row mb-2' data-kt-buttons='true'>
                    
            <div className='col'>  
              <div className='fs-4 text-gray-800 d-flex justify-content-end mt-4'>
                <label className='d-flex align-items-center form-label mb-3 invisible'>
                  .
                </label>
                <button type="submit" className="btn btn-dark mb-1 btn-sm">Grabar</button>
              </div>
            </div>  
 
          </div> 
 
 
           
        </div>
  
        </form>
        </div>
      </div>
    </div>
  )
}

export default SeriePage
