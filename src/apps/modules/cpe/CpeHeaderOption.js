import {useState} from 'react' 
import {Link} from 'react-router-dom'
import * as XLSX from 'xlsx';
import {useSearch} from './busqueda/core/searchContext'; 
import {CpeServiceGetData} from './busqueda/services/CpeService'; 
import moment from 'moment'; 
import {useAuth} from '../auth';

const CpeHeaderOption = () => {

  const { searchCpe } = useSearch();   
  const {currentEmisor} = useAuth(); 

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
 
  const exportToExcel = async() =>{
      const cpes = await CpeServiceGetData(getDefault());
      const workSheet = XLSX.utils.json_to_sheet(cpes);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "comprobantes");
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook,"Listado_Comprobantes.xlsx");
  }


  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-1'> 

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap'>
              <div className='d-flex flex-column'></div>

              <div className='d-flex my-4'> 
                  
                <Link to='.' onClick={() => exportToExcel()}  className='btn btn-dark me-3'>
                  Exportar CPE
                </Link>
                {/* <Link to='.'  className='btn btn-dark me-3'>
                  Descargar XML
                </Link>
                <Link to='.'  className='btn btn-dark me-3'>
                  Descargar PDF
                </Link>
                <Link to='.' className='btn btn-dark me-3'>
                  Descargar CDR
                </Link> */}
              </div>
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  )
}

export {CpeHeaderOption}
