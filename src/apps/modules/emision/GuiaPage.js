
import { useState,useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core' 
import { useForm } from "react-hook-form"; 
import Swal from 'sweetalert2'; 
import {getSerie} from './services/EmisionService';   
import { DatosEmisor } from './components/DatosEmisor'
import { DatosReceptor } from './components/DatosReceptor'
import { DatosEmision } from './components/DatosEmision'
import { DatosDetalle } from './components/DatosDetalle'
import { DatosTotales } from './components/DatosTotales';  
import { DatosAdicionales } from './components/DatosAdicionales';  
import { DatosDocRelacionado } from './components/DatosDocRelacionado';
import { DatosContingencia } from './components/DatosContingencia'; 
import { DatosTransporte } from './components/DatosTransporte'; 
import { DatosEnvio } from './components/DatosEnvio'; 
import { useEmision } from './core/EmisionContext'; 
import { CreateCpe, PrevisualizeCpe} from './services/EmisionService';  
import { useAuth } from '../auth';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { pdfjs } from 'react-pdf'; 
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; 
  
const profileBreadCrumbs = [
  {
    title: 'Busqueda',
    path: '/emision/boleta',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

function MyVerticallyCenteredModal(props) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();      
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [loading, setLoading] = useState(false)
  let { register, handleSubmit } = useForm();   
  const {currentEmisor} = useAuth(); 

  const { datosCpe,datosReceptor,datosTransporte,datosEnvio,datosItem, datosTotales, datosAdicionales, datosContingencia, datosDocRel, 
    CleanDatosCpe, CleanDatosReceptor, CleanDatosTransporte, CleanDatosEnvio, CleanItem, CleanDatosTotales, CleanDatosAdicionales, CleanDatosContingencia, CleanDocRel} = useEmision();
  
  const cleanData = async () => { 
    CleanDatosContingencia()
    CleanDatosCpe()
    CleanDatosReceptor()
    CleanDatosTransporte()
    CleanDatosEnvio()
    CleanDatosAdicionales()        
    CleanDatosTotales() 
    CleanItem() 
    CleanDocRel()
  };  

  const {urlcpe} = props; 
 
  const manejarSubmit = async (event, data) => { 
    event.stopPropagation();

    let factura = { 
      datosContingencia,
      datosCpe,
      datosEmisor:{
        tipoDocumento : 6,
        rucEmisor: currentEmisor.rucEmisor
      },
      datosReceptor,
      datosTransporte,
      datosEnvio,
      datosItem,
      datosAdicionales,  
      datosDocRel,
      datosTotales
  }
    
  console.log(factura);

  const cpe = await CreateCpe(factura);
  console.log(cpe); 
    if (cpe.indicador == true) {
 
      cleanData();

      props.onHide();
   
      Swal.fire({
        icon: "success",
        title: cpe.message,
        showConfirmButton: false,
        timer: 5000
      })  
    } else {
      Swal.fire({
        icon: "error",
        title: cpe.message,
        showConfirmButton: false,
        timer: 5000
      })  
    } 

  }
   
  return ( 

          <Modal
              {...props}
              size="xl"
              aria-labelledby="contained-modal-title-vcenter"
              dialogClassName="modal-90w" 
              centered
          >
               <Modal.Body>  
                    <form className='form w-100' onSubmit={(e) => {e.preventDefault(); handleSubmit(manejarSubmit(e))}} noValidate id='kt_login_signin_form'> 

                           <div style={{ height: '600px' }} > 
                           {urlcpe && (
                              <Viewer
                                fileUrl={urlcpe}
                                plugins={[defaultLayoutPluginInstance]}
                                defaultScale={1}
                                defaultScaleDelta={1.1}
                                defaultScaleValue="page-width"
                              />
                            )} 
                          </div>
                        
                        <div className='d-flex flex-row-reverse mt-2'>
                            <button type='submit' className='btn btn-dark me-3'>
                                <span className='indicator-label'>Emitir Comprobante</span>
                            </button> 
                            <Button className='btn btn-dark me-3' onClick={props.onHide}>Cerrar</Button>
                        </div>
                        
                    </form>

              </Modal.Body> 
          </Modal>  

  );
}
 
 
const GuiaPage = () => {

  const [modalShow, setModalShow] = useState(false);
  
  let { register, handleSubmit } = useForm();   
  const {currentEmisor} = useAuth(); 
  const { datosCpe,datosReceptor,datosTransporte,datosEnvio,datosItem, datosTotales, datosAdicionales, datosContingencia, datosDocRel, 
    CleanDatosCpe, CleanDatosReceptor, CleanDatosTransporte, CleanDatosEnvio, CleanItem, CleanDatosTotales, CleanDatosAdicionales, CleanDatosContingencia, CleanDocRel} = useEmision();
  const [ dataSerie, setDataSerie ] = useState();
  const [ urlCpe, setUrlCpe ] = useState();
  const [ cpe, setCpe ] = useState();

  const getSerieEmisor = async () => { 
    const serie = await getSerie({rucEmisor:currentEmisor.rucEmisor});
    setDataSerie(serie);
  };

  const cleanData = async () => { 
    CleanDatosContingencia()
    CleanDatosCpe()
    CleanDatosReceptor()
    CleanDatosTransporte()
    CleanDatosEnvio()
    CleanDatosAdicionales()        
    CleanDatosTotales() 
    CleanItem() 
    CleanDocRel() 
  }; 

  useEffect(() => {   
    cleanData();
    getSerieEmisor();
  }, [])  

  const manejarSubmit = async (data) => {   

    if (!datosCpe || !datosCpe.fechaCpe) { 

      Swal.fire({
        icon: "error",
        title: "Debe seleccionar la Fecha de Emisión",
        showConfirmButton: false,
        timer: 5000
      })            
      return false;
    }
 
    if (!datosCpe || !datosCpe.fechaVencimiento) { 
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar la Fecha de Vencimiento",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }
 
    if (!datosCpe || !datosCpe.moneda) { 
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar la Moneda",
        showConfirmButton: false,
        timer: 5000
      })     
      return false;
    }

    if (!datosReceptor || !datosReceptor.tipoDocumento) { 
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar el Tipo de Documento del Receptor",
        showConfirmButton: false,
        timer: 5000
      })    
      return false;
    }

    if (!datosReceptor || !datosReceptor.numeroDocumento) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Número de Documento del Receptor",
        showConfirmButton: false,
        timer: 5000
      })   
      return false;
    }

    if (!datosReceptor || !datosReceptor.razonSocial) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Razón Social del Receptor",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }
    

if(!datosEnvio.trasladoVehiculoM1L)
  {
    if (!datosTransporte || !datosTransporte.conductorDocumento) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar número de documento del Conductor",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "01" && !datosTransporte.conductorNombre) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Razón Social o nombre del Conductor",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "01" && datosTransporte.conductorID === "1") { 
      Swal.fire({
        icon: "error",
        title: "Selecionar el tipo documento chofer RUC",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }    

    if (datosEnvio.modalidadTransporte === "02" && datosTransporte.conductorID === "6") { 
      Swal.fire({
        icon: "error",
        title: "Selecionar el tipo documento chofer DNI",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }        

    if (datosEnvio.modalidadTransporte === "02" &&  !datosTransporte.conductorNombres) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar los nombres del Conductor",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "02" &&  !datosTransporte.conductorApellidos) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar los apellidos del Conductor",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "02" &&  !datosTransporte.conductorLicencia) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el número de licencia",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "02" &&  !datosTransporte.vehiculoPlaca) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la placa del vehículo",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (datosEnvio.modalidadTransporte === "01" && (!datosTransporte.conductorCompanyId || !/^[A-Z0-9]{1,20}$/.test(datosTransporte.conductorCompanyId.trim()))) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar un Número de Registro MTC válido",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }
  }

    // if (datosEnvio.modalidadTransporte === "01" && datosTransporte.conductorID === "1") { 
    //   Swal.fire({
    //     icon: "error",
    //     title: "Transporte Público el documento del chofer deber ser RUC",
    //     showConfirmButton: false,
    //     timer: 5000
    //   })  
    //   return false;
    // }   

    if (!datosEnvio || !datosEnvio.modalidadTransporte) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Modalidad del Transporte",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (!datosEnvio || !datosEnvio.motivoTraslado) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Modalidad del traslado",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }                 

    if (!datosEnvio || !datosEnvio.pesoUnidad) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la unidad del peso",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    } 

    if (!datosEnvio || !datosEnvio.pesoBrutoTotal) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Peso Bruto Total",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }
    
    if (!datosEnvio || !datosEnvio.puntoPartida || !datosEnvio.puntoLlegada) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Punto de Partida y Punto de LLegada",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }

    if (!datosEnvio || !datosEnvio.puntoPartidaUbigeo || !datosEnvio.puntoLlegadaUbigeo) { 
      Swal.fire({
        icon: "error",
        title: "Debe selecionar el departamento, provincia y distrito para el ubigeo",
        showConfirmButton: false,
        timer: 5000
      })  
      return false;
    }       

    if (!datosItem || datosItem.length == 0)  { 
      Swal.fire({
        icon: "error",
        title: "Debe agregar al menos un ítem",
        showConfirmButton: false,
        timer: 5000
      }) 
      return false;
    }

    if (!datosCpe || !datosCpe.porcentajeIgv) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el valor del IGV",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!datosContingencia || datosContingencia.indContingencia == true) { 
      if (!datosContingencia || !datosContingencia.serieContingencia) { 
        Swal.fire({
          icon: "error",
          title: "Debe ingresar la Serie de Contingencia",
          showConfirmButton: false,
          timer: 5000
        })   
        return false;
      }

      if (!datosContingencia || !datosContingencia.correlativoContingencia) { 
        Swal.fire({
          icon: "error",
          title: "Debe ingresar el Correlativo de Contingencia",
          showConfirmButton: false,
          timer: 5000
        })   
        return false;
      }

      if (!datosContingencia || !datosContingencia.codigoAutorizacion) { 
        Swal.fire({
          icon: "error",
          title: "Debe ingresar el Código de Autorización de Contingencia",
          showConfirmButton: false,
          timer: 5000
        })   
        return false;
      }
    }
   

    let factura = {
      accion: 'test',
      datosContingencia,
      datosCpe,
      datosEmisor:{
        tipoDocumento : 6,
        rucEmisor: currentEmisor.rucEmisor
      },
      datosReceptor,
      datosTransporte,
      datosEnvio,
      datosItem,
      datosAdicionales,  
      datosDocRel,
      datosTotales
  }
    

  console.log(factura);
  setCpe(factura);
  const cpe = await PrevisualizeCpe(factura); 

  console.log(cpe);
  setUrlCpe(cpe.message)
  setModalShow(true);

  }

    return (
    <>  
        <Outlet /> 
        <PageTitle breadcrumbs={profileBreadCrumbs}>Emision de Factura Electrónica</PageTitle>   

        {
          !dataSerie ?
          (

            <h3 className='text-muted mt-1 fw-semibold'>No existe una serie asignada para este Emisor</h3>

          )
          :
          (
 
            <>
                <DatosEmisor tipoCpe="GUIA DE REMISIÓN"/>
                <DatosContingencia />
                <DatosEmision tipoCpe="09"/>
                <DatosReceptor tipoDocumento="6" tipoCpe="09"/>
                <DatosEnvio/>
                <DatosTransporte tipoDocumento="6"/>
                <DatosDetalle /> 
                <DatosDocRelacionado />
                <DatosAdicionales />
                <DatosTotales />
        
                <form onSubmit={handleSubmit(manejarSubmit)}>
                
                  <div className='fs-4 text-gray-800 d-flex justify-content-end mt-4'>
                    <label className='d-flex align-items-center form-label mb-3 invisible'>
                      .
                    </label>
                    <button type="submit" className="btn btn-dark mb-1 w-250px"> Previsualizar</button>
                    {
                      modalShow 
                      ?
                      (
                          <MyVerticallyCenteredModal 
                          urlcpe={urlCpe} 
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                      />
                      )
                      :
                      <></>
                    }
                  </div>   
        
                </form>
             </>

          )

        }
  


    </>
    )
  }
export default GuiaPage
