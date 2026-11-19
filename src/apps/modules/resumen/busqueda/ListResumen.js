import {useEffect, useState, useMemo} from 'react' 
import {CpeLoading} from '../../loading/CpeLoading' 
import {CpeServiceGetData} from './services/ResumenService'; 
import ResumenBody from './ResumenBody';
import {useSearch} from './core/resumenContext'; 
import {usersColumns} from './table/_columns'
import {useAuth} from '../../auth';
import moment from 'moment'; 
import {LastQuery} from '../../cpe/LastQuery';
 
const sortByPublicationDate = (records) => records
  .map((record, index) => ({record, index}))
  .sort((left, right) => {
    const leftTime = moment(left.record.fechaPublicacion).valueOf();
    const rightTime = moment(right.record.fechaPublicacion).valueOf();
    const leftIsValid = Number.isFinite(leftTime);
    const rightIsValid = Number.isFinite(rightTime);

    if (!leftIsValid || !rightIsValid) {
      if (leftIsValid !== rightIsValid) return leftIsValid ? -1 : 1;
      return left.index - right.index;
    }

    return rightTime - leftTime;
  })
  .map(({record}) => record);

const ListResumen = ({tipoCpe}) => {

  const [loading, setLoading] = useState(false)
  const { searchResumen } = useSearch();  
  const [cpeData, setCpeData] = useState([]);  
  const {currentEmisor} = useAuth(); 

  const columns = useMemo(() => usersColumns, [])
 
  const getProduct = async () => {  

    setLoading(false);
    const cpes = await CpeServiceGetData(getDefault());    
    const orderedCpes = sortByPublicationDate(cpes);
    setCpeData(orderedCpes);
    setLoading(true); 
  
  }  

  const getDefault = () => {
  
    let rucEmisor = (searchResumen.rucEmisor === '-') ? currentEmisor.rucEmisor : searchResumen.rucEmisor;
    let fechaDesde = (searchResumen.fechaDesde === '' || searchResumen.fechaDesde === '-' || searchResumen.fechaDesde === false) ? moment().startOf('month').format('YYYY-MM-DD') : searchResumen.fechaDesde;   
    let fechaHasta = (searchResumen.fechaHasta === '' || searchResumen.fechaHasta === '-' || searchResumen.fechaHasta === false) ?  moment().endOf('month').format('YYYY-MM-DD') : searchResumen.fechaHasta;   
    let datos = {...searchResumen, fechaDesde, fechaHasta, rucEmisor, tipoCpe }  
    return datos;

  }

  useEffect(() => {    
    getProduct() 
  }, [])  
  
   
  useEffect(() => {  
    getProduct() 
  }, [tipoCpe])  
 
  return (
  <div className={`card mb-5 mb-xl-8 portal-cpe-list`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <div className='portal-cpe-list-header'>
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
    <LastQuery queryData={cpeData} />
    </div>

  </div> 
 
          {
              loading
              ? 
              (  
                <ResumenBody  cpes={cpeData} cpesColumns={columns}/>    
              )
              :
              (
                <CpeLoading />
              )
          } 
 
</div>
  )
}  

export {ListResumen}
