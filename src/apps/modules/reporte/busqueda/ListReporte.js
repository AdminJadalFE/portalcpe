import {useEffect, useState, useMemo} from 'react' 
import {CpeLoading} from '../../loading/CpeLoading'  
import {getReporteData} from './services/ReporteService'; 
import ReporteBody from './ReporteBody'; 
import {usersColumns} from './table/_columns';
import {useAuth} from '../../auth'; 

  const ListReporte = () => { 

        const [reporteData, setReporteData] = useState([]); 
    const {currentEmisor} = useAuth(); 

    const columns = useMemo(() => usersColumns, [])
  
    const getReporte = async () => { 
      const dataReporte = {
        "rucEmisor": currentEmisor.rucEmisor
      }   
      const reportes = await getReporteData(dataReporte);    
      console.log(reportes); 
      setReporteData(reportes);  
    }   
 
    useEffect(() => {    
      getReporte() 
    }, [])  
    
    useEffect(() => {    
      getReporte() 
    }, [currentEmisor])  
 
  return (
  <div className={`card mb-5 mb-xl-8`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>

      <span className='card-label fw-bold fs-3 mb-1'>Listado de Reportes</span>
          {
              !reporteData
              ? 
              (  
                <span className='text-muted mt-1 fw-semibold fs-7'>Se han encontrado 0 registros</span>
              )
              :
              (
                <span className='text-muted mt-1 fw-semibold fs-7'>Se han encontrado {reporteData.length} registros</span>
              )
          }
    </h3>

  </div> 

  {/* <div className='card-body py-3'>  */}
    {/* <div className='table-responsive'>  */}
 
          {
              reporteData
              ? 
              (  
                // <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'> 
                  <ReporteBody  cpes={reporteData} cpesColumns={columns}/>   
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

export {ListReporte}
