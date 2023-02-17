/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useContext} from 'react';  
import { useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import {getTipoCPE, getEstados, getSedes} from './busqueda/services/CpeService';  
import {useSearch} from './busqueda/core/searchContext';
import {useAuth} from '../auth';
import moment from 'moment'; 

const CpeHeaderSearch = () => {

  const { searchCpe, setDataCpe, setDataFilterCpe } = useSearch();
  const {currentEmisor} = useAuth(); 
 
  let { register, handleSubmit } = useForm();   
  const [startDate, setStartDate] = useState(new Date(moment(searchCpe.fechaDesde).add(5, 'h').format()));
  const [endDate, setEndDate] = useState(new Date(moment(searchCpe.fechaHasta).add(5, 'h').format()));
 
  const [tipoCPE, setTipoCPE] = useState([]);  
  const [estadoCPE, setEstadoCPE] = useState([]); 
  const [sede, setSede] = useState([]); 
 
  const getDataList = async() => { 
    let tipocpe = await getTipoCPE(); 
    setTipoCPE(tipocpe); 
    let estado = await getEstados(); 
    setEstadoCPE(estado);
    let sede = await getSedes({rucEmisor: currentEmisor.rucEmisor}); 
    setSede(sede); 
  }

  const setFilterCpe = async () => {       
    let datos = {undefined, undefined} 
    setDataFilterCpe(datos);  
  }
 
  useEffect(() => {  
    getDataList(); 
  }, [])

  const manejarSubmit = async (data) => {   
    setFilterCpe();    
    let rucEmisor = currentEmisor.rucEmisor;
    let fechaDesde = moment(startDate).format("YYYY-MM-DD");
    let fechaHasta = moment(endDate).format("YYYY-MM-DD");
    let rucReceptor = (data.rucReceptor === undefined || data.rucReceptor === '' || data.rucReceptor === false) ? '-' : data.rucReceptor;
    let serieCpe = (data.serieCpe === undefined || data.serieCpe === '' || data.serieCpe === false) ? '-' : data.serieCpe;
    let numeroDesde = (data.numeroDesde === undefined || data.numeroDesde === '' || data.numeroDesde === false) ? '-' : data.numeroDesde;
    let numeroHasta = (data.numeroHasta === undefined || data.numeroHasta === '' || data.numeroHasta === false) ? '-' : data.numeroHasta; 
    let estadoCpe = (data.estadoCpe === undefined || data.estadoCpe === '' || data.estadoCpe === '-' || data.estadoCpe === false) ? '-' : data.estadoCpe; 
    let tipoCpe = (data.tipoCpe === undefined || data.tipoCpe === '' || data.tipoCpe === '-' || data.tipoCpe === false) ? '-' : data.tipoCpe; 
    let datos = {...data, fechaDesde, fechaHasta, rucEmisor, rucReceptor, serieCpe, numeroDesde, numeroHasta, estadoCpe, tipoCpe}   
 
    setDataCpe(datos);  
  }
  
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
                className='form-control form-control-solid w-250px ps-5' 
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
                className='form-control form-control-solid w-250px ps-5' 
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
              Tipo Cpe
            </label> 

            <select name="tipoCpe"  
                     className='form-control form-control-solid w-250px  ps-5' 
                    {...register('tipoCpe', { required: false })}  
            >
                <option value="-">Seleccione...</option> 
                  {
                      tipoCPE.map((elm,i) => (
                          <option key={i} value={elm.tipocpeCod}>{elm.tipocpeCod}-{elm.tipocpeDesc}</option>
                      ))
                  }
              </select>
            </div>  

            <div className='col'> 
            <label className='d-flex align-items-center form-label mb-3'>
              Estado Cpe
            </label>
            <select name="estadoCpe" 
                     className='form-control form-control-solid w-250px ps-5'  
                    {...register('estadoCpe', { required: false })}  
            >
            <option value="-">Seleccione...</option> 
                  {
                      estadoCPE.map((elm,i) => (
                          <option key={i} value={elm.estado_desc}>{elm.estado_cod}-{elm.estado_desc}</option>
                      ))
                  }
              </select>
            </div>  

            <div className='col'> 
            <label className='d-flex align-items-center form-label mb-3'>
              Ruc Receptor
            </label>
            <input
              type='text'
              data-kt-user-table-filter='search'
              id="rucReceptor"
              name="rucReceptor" 
              className='form-control form-control-solid w-250px ps-5'
              {...register('rucReceptor', { required: false })} 
            /> 
            </div>   
          </div> 


          <div className='row mb-2' data-kt-buttons='true'>
            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
                Sede
              </label>  
              
              <select name="Sucursal"
                     className='form-control form-control-solid w-250px ps-5' 
                    {...register('Sucursal', { required: false })}  
            >
            <option value="-">Seleccione...</option> 
                  {
                      sede.map((elm,i) => (
                          <option key={i} value={elm.sede}>{elm.sede}</option>
                      ))
                  }
              </select>
            </div>       
            <div className='col'> 
              <label className='d-flex align-items-center form-label mb-3'>
              Serie
              </label>
              <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid w-250px ps-5' 
                id="serieCpe"
                name="serieCpe" 
                {...register('serieCpe', { required: false })} 
              /> 
            </div>        

            <div className='col'> 
            <label className='d-flex align-items-center form-label mb-3'>
              Número Desde
            </label>
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-250px ps-5' 
              id="numeroDesde"
              name="numeroDesde" 
              {...register('numeroDesde', { required: false })} 
            /> 
            </div>  

            <div className='col'> 
            <label className='d-flex align-items-center form-label mb-3'>
              Número Hasta
            </label>
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-250px ps-5' 
              id="numeroHasta"
              name="numeroHasta" 
              {...register('numeroHasta', { required: false })} 
            /> 
            </div>    

            <div className='col'>  
              <label className='d-flex align-items-center form-label mb-3 invisible'>
                .
              </label>
              <button type="submit" className="btn btn-dark mb-1 w-250px">Consultar</button>
            </div>    
  
          </div> 
           
        </div>
  
        </form>
        </div>
      </div>
    </div>
  )
}

export {CpeHeaderSearch}
