import {Link} from 'react-router-dom'
import * as XLSX from 'xlsx';
import {useSearch} from './busqueda/core/searchContext'; 
import {CpeServiceGetData} from './busqueda/services/CpeService'; 
import {createReporte} from '../reporte/busqueda/services/ReporteService'; 
import moment from 'moment'; 
import {useAuth} from '../auth';
import Swal from 'sweetalert2';
import { differenceInDays } from 'date-fns';

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

  const exportReport = async(tipo) =>{
    const dataReport = getDefault();

    console.log(dataReport);

    // Fechas de ejemplo
    const fechaInicio = new Date(dataReport.fechaDesde);
    const fechaFin = new Date(dataReport.fechaHasta);

    // Obtener la cantidad de días entre las fechas
    const cantidadDias = differenceInDays(fechaFin,fechaInicio);
  
    
    if (cantidadDias < 0) {
      Swal.fire({
        icon: "warning",
        title: 'La Fecha de Inicio no puede ser mayor a la Fecha de Fin',
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }    

    if (cantidadDias > 7) {
      Swal.fire({
        icon: "warning",
        title: 'Solo se permite generar reportes de un rango de 7 días',
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    dataReport.tipoReporte = tipo;
    dataReport.usuario = 'adm@jadal.pe';
    const response = await createReporte(dataReport)
    if (response.status == true) {
      Swal.fire({
        icon: "success",
        title: `Se ha registrado de manera satisfactoria su solicitud de reporte, este estará disponible pronto en la opción Reportes.`,
        showConfirmButton: false,
        timer: 5000
    })  
    } else {
      Swal.fire({
        icon: "error",
        title: response.content + ', por favor revise la opción Reportes.',
        showConfirmButton: false,
        timer: 5000
    })  
    } 
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
                <Link to='.' onClick={() => exportReport('PDF')}  className='btn btn-dark me-3'>
                  Exportar PDF
                </Link> 
                <Link to='.' onClick={() => exportReport('XML')}  className='btn btn-dark me-3'>
                  Exportar XML
                </Link> 
              </div>
 
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  )
}

export {CpeHeaderOption}
