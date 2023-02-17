import {useEffect, useState, useMemo} from 'react' 
import {Link} from 'react-router-dom'
import {CpeLoading} from '../../loading/CpeLoading' 
import {getTipoCPE} from '../busqueda/services/CpeService';  
import {GetCpeResume} from '../busqueda/services/CpeService'; 
import {ResumeCpeBody} from '../resumen/ResumeCpeBody';
import {useSearch} from '../busqueda/core/searchContext';  
import {useAuth} from '../../auth';
import moment from 'moment'; 

  const ResumeCpe = () => { 

    const { searchCpe } = useSearch();  
    const [cpeData, setCpeData] = useState([]); 
    const {currentEmisor} = useAuth(); 

    const [tipoCPE, setTipoCPE] = useState([]);  

    const getDataList = async() => {   
      let tipocpe = await getTipoCPE();  
      setTipoCPE(tipocpe);  
    }
   
 
    const getProduct = async () => {  
      const cpes = await GetCpeResume(getDefault());    
      setCpeData(cpes);  
    }  
   
    const getDefault = () => {
      console.log("ResumeCpe", searchCpe);
      let rucEmisor = (searchCpe.rucEmisor === '-') ? currentEmisor.rucEmisor : searchCpe.rucEmisor;
      let fechaDesde = (searchCpe.fechaDesde === '' || searchCpe.fechaDesde === '-' || searchCpe.fechaDesde === false) ? moment().startOf('month').format('YYYY-MM-DD') : searchCpe.fechaDesde;   
      let fechaHasta = (searchCpe.fechaHasta === '' || searchCpe.fechaHasta === '-' || searchCpe.fechaHasta === false) ?  moment().endOf('month').format('YYYY-MM-DD') : searchCpe.fechaHasta;   
      let datos = {...searchCpe, fechaDesde, fechaHasta, rucEmisor}   
 
      return datos; 
    }
  
    useEffect(() => {   
      getDataList(); 
      getProduct() 
    }, [])  
    
    useEffect(() => {   
      getDataList(); 
      getProduct() 
    }, [searchCpe])  
 
  return (
  <div className={`card mb-5 mb-xl-8`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>

      <span className='card-label fw-bold fs-3 mb-1'>Resumen de Comprobantes Emitidos</span>

      <Link to='/cpe/busqueda' className='text-primary opacity-75-hover'>
              -> Ir a consulta de Comprobantes
      </Link>
         
    </h3>

  </div> 

  {/* <div className='card-body py-3'>  */}
    {/* <div className='table-responsive'>  */}
 
          {
              cpeData
              ? 
              (  
                // <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'> 
                  <ResumeCpeBody tipocpe={tipoCPE} data={cpeData}/>   
                // {/* </table>  */}
              )
              :
              (
                <CpeLoading />
              )
          }  

    {/* </div>  */}
  {/* </div>  */}

</div>
  )
}  

export {ResumeCpe}
