import {useEffect, useState, useMemo} from 'react' 
import {CpeLoading} from '../../loading/CpeLoading' 
import {CpeServiceGetData} from './services/CpeService'; 
import CpesBody from './CpesBody';
import {useSearch} from './core/searchContext'; 
import {usersColumns} from './table/_columns';
import {useAuth} from '../../auth';
import moment from 'moment'; 

  const ListCpe = () => { 

    const { searchCpe } = useSearch();  
    const [cpeData, setCpeData] = useState([]); 
    const {currentEmisor} = useAuth(); 

    const columns = useMemo(() => usersColumns, [])
 
    const getProduct = async () => {  
      const cpes = await CpeServiceGetData(getDefault());   
      console.log("cpes:", cpes)
      setCpeData(cpes);  
    }  
   
    const getDefault = () => {
  
      let rucEmisor = (searchCpe.rucEmisor === '-') ? currentEmisor.rucEmisor : searchCpe.rucEmisor;
      let fechaDesde = (searchCpe.fechaDesde === '' || searchCpe.fechaDesde === '-' || searchCpe.fechaDesde === false) ? moment().startOf('month').format('YYYY-MM-DD') : searchCpe.fechaDesde;   
      let fechaHasta = (searchCpe.fechaHasta === '' || searchCpe.fechaHasta === '-' || searchCpe.fechaHasta === false) ?  moment().endOf('month').format('YYYY-MM-DD') : searchCpe.fechaHasta;   
      let rucReceptor = (searchCpe.rucReceptor === '' || searchCpe.rucReceptor === '-' || searchCpe.rucReceptor === false) ? '-' : searchCpe.rucReceptor;
      let serieCpe = (searchCpe.serieCpe === '' || searchCpe.serieCpe === '-' || searchCpe.serieCpe === false) ? '-' : searchCpe.serieCpe;
      let numeroDesde = (searchCpe.numeroDesde === '' || searchCpe.numeroDesde === '-' || searchCpe.numeroDesde === false) ? '-' : searchCpe.numeroDesde;
      let numeroHasta = (searchCpe.numeroHasta === '' || searchCpe.numeroHasta === '-' || searchCpe.numeroHasta === false) ? '-' : searchCpe.numeroHasta;
      let Sucursal = (searchCpe.Sucursal === '' || searchCpe.Sucursal === '-' || searchCpe.Sucursal === false) ? '-' : searchCpe.Sucursal;
   
      let datos = {...searchCpe, fechaDesde, fechaHasta, rucEmisor, rucReceptor, serieCpe, numeroDesde, numeroHasta, Sucursal}  
       
      return datos;

    }
 
 
    useEffect(() => {   
      getProduct() 
    }, [])  
    
    useEffect(() => {   
      getProduct() 
    }, [searchCpe])  
 
  return (
  <div className={`card mb-5 mb-xl-8`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>

      <span className='card-label fw-bold fs-3 mb-1'>Listado de Comprobantes</span>
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
 
          {
              cpeData
              ? 
              (  
                // <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'> 
                  <CpesBody  cpes={cpeData} cpesColumns={columns}/>   
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

export {ListCpe}
