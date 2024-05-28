/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useContext} from 'react';  
import { useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import {getTipoCPE, getEstados, getSedes} from './busqueda/services/CpeService';  

import {useSearch} from './busqueda/core/searchContext';
import {useAuth} from '../auth';
import moment from 'moment'; 

const CpeResumeHeaderSearch = () => {
  const { searchCpe, setDataCpe } = useSearch();
  const {currentEmisor} = useAuth(); 
  
  let { register, handleSubmit } = useForm();  

  const [startDate, setStartDate] = useState(new Date(moment().startOf('month')));
  const [endDate, setEndDate] = useState(new Date(moment().endOf('month')));
  const [sede, setSede] = useState([]); 

  const getDataList = async() => { ;
    let sede = await getSedes({rucEmisor: currentEmisor.rucEmisor}); 
    setSede(sede); 
  }

  const getDefault = () => {
    let rucEmisor = currentEmisor.rucEmisor;
    let fechaDesde = moment(startDate).format("YYYY-MM-DD");
    let fechaHasta = moment(endDate).format("YYYY-MM-DD");
    let Sucursal = (searchCpe.Sucursal === '' || searchCpe.Sucursal === '-' || searchCpe.Sucursal === false) ? '-' : searchCpe.Sucursal;
    let datos = {...searchCpe,fechaDesde, fechaHasta, rucEmisor, Sucursal}  
    setDataCpe(datos);  
  }

  const manejarSubmit = async (data) => {   
    setDataCpe({
      ...searchCpe,
      ...data,
      fechaDesde: moment(startDate).format("YYYY-MM-DD"),
      fechaHasta: moment(endDate).format("YYYY-MM-DD"),
      rucEmisor: currentEmisor.rucEmisor
    });
  }

  useEffect(() => {   
    getDataList(); 
    getDefault(); 
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
                Fecha Desde 
              </label> 
              <DatePicker 
                className='form-control form-control-solid w-200px form-control-sm' 
                id="fechaDesde"
                name="fechaDesde" 
                wrapperClassName="datePicker"  
                dateFormat= "yyyy-MM-dd" 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                // {...register('fechaDesde', { required: false })} 
              />
            </div>       
            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
              Fecha Hasta 
              </label>
              <DatePicker 
                className='form-control form-control-solid w-200px form-control-sm' 
                id="fechaHasta"
                name="fechaHasta" 
                wrapperClassName="datePicker"  
                dateFormat= "yyyy-MM-dd" 
                selected={endDate} 
                onChange={date => setEndDate(date)} 
                // {...register('fechaHasta', { required: false })} 
              />
            </div>        
            <div className='col'> 
                <label className='d-flex align-items-center form-label mb-3'>
                  Sede
                </label>  
                
                <select
                    name="Sucursal"
                    className='form-control form-control-solid w-200px form-control-sm'
                    {...register('Sucursal')}
                  >
                    <option value="-">Seleccione...</option> 
                    {sede.map((elm, i) => (
                      <option key={i} value={elm.sede}>{elm.sede}</option>
                    ))}
                  </select>
              </div>    
            <div className='col'>  
              <label className='d-flex align-items-center form-label mb-3 invisible'>
                .
              </label>
              <button type="submit" className="btn btn-dark mb-1 btn-sm">Consultar</button>
            </div>  
 
          </div> 
 
           
        </div>
  
        </form>
        </div>
      </div>
    </div>
  )
}

export {CpeResumeHeaderSearch}
