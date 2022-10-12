/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useContext} from 'react';  
import { useForm } from "react-hook-form"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";   
import {useSearch} from './busqueda/core/resumenContext';
import {useAuth} from '../auth'
import moment from 'moment'; 

const ResumenHeaderSearch = ({tipoCpe}) => { 
  const { searchResumen, setDataResumen } = useSearch();
  const {currentEmisor} = useAuth(); 
  
  let {  handleSubmit } = useForm();  
  const [startDate, setStartDate] = useState(new Date(moment().startOf('month')));
  const [endDate, setEndDate] = useState(new Date(moment().endOf('month')));

  const manejarSubmit = async (data) => {      
    let fechaDesde = moment(startDate).format("YYYY-MM-DD");
    let fechaHasta = moment(endDate).format("YYYY-MM-DD");
    let rucEmisor = currentEmisor.rucEmisor;
    let datos = {...data, fechaDesde, fechaHasta, rucEmisor, tipoCpe}  
    setDataResumen(datos);  
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

export {ResumenHeaderSearch}
