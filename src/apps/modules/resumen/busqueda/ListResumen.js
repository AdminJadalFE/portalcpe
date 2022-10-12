import {useEffect, useState, useMemo} from 'react' 
import {CpeLoading} from '../../loading/CpeLoading' 
import {CpeServiceGetData} from './services/ResumenService'; 
import ResumenBody from './ResumenBody';
import {useSearch} from './core/resumenContext'; 
import {usersColumns} from './table/_columns'
import {useAuth} from '../../auth';
import moment from 'moment'; 
 
 const ListResumen = ({tipoCpe}) => { 

  const { searchResumen } = useSearch();  
  const [cpeData, setCpeData] = useState([]);  
  const {currentEmisor} = useAuth(); 

  const columns = useMemo(() => usersColumns, [])
 
  const getProduct = async () => {  
    const cpes = await CpeServiceGetData(getDefault());    
    setCpeData(cpes); 
  }  

  const getDefault = () => {
  
    let rucEmisor = (searchResumen.rucEmisor === '-') ? currentEmisor.rucEmisor : searchResumen.rucEmisor;
    let fechaDesde = (searchResumen.fechaDesde === '' || searchResumen.fechaDesde === '-' || searchResumen.fechaDesde === false) ? moment().startOf('month').format('YYYY-MM-DD') : searchResumen.fechaDesde;   
    let fechaHasta = (searchResumen.fechaHasta === '' || searchResumen.fechaHasta === '-' || searchResumen.fechaHasta === false) ?  moment().endOf('month').format('YYYY-MM-DD') : searchResumen.fechaHasta;   
 
    let datos = {...searchResumen, fechaDesde, fechaHasta, rucEmisor, tipoCpe }  
     
    return datos;

  }

  useEffect(() => {   
    console.log("ListResumen");
    getProduct() 
  }, [])  
  
   
  useEffect(() => {  
    getProduct() 
  }, [tipoCpe])  
 
  return (
  <div className={`card mb-5 mb-xl-8`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>

      <span className='card-label fw-bold fs-3 mb-1'>Listado de {tipoCpe === 'RC' ? 'Resumenes' : 'Bajas'} </span>
          {
              !cpeData
              ? 
              (  
                <span className='text-muted mt-1 fw-semibold fs-7'>Se han encontrado 0 registros</span>
              )
              :
              (
                <span className='text-muted mt-1 fw-semibold fs-7'>Se han encontrado {cpeData.length} registros</span>
              )
          }
    </h3>

  </div> 
  {/* <div className='card-body py-3'>  */}
    {/* <div className='table-responsive'>  */}

          
      {/* <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>  */}
          {
              cpeData
              ? 
              (  
                <ResumenBody  cpes={cpeData} cpesColumns={columns}/>    
              )
              :
              (
                <CpeLoading />
              )
          } 
      {/* </table>  */}
    {/* </div>  */}
  {/* </div>  */}
</div>
  )
}  

export {ListResumen}
