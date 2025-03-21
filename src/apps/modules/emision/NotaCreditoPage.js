
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { getSerie } from './services/EmisionService';
import { DatosEmisor } from './components/DatosEmisor'
import { DatosReceptor } from './components/DatosReceptor'
import { DatosReferencia } from './components/DatosReferencia'
import { DatosEmision } from './components/DatosEmision'
import { DatosDetalle } from './components/DatosDetalle'
import { DatosTotales } from './components/DatosTotales';
import { DatosAdicionales } from './components/DatosAdicionales';
import { DatosDocRelacionado } from './components/DatosDocRelacionado';
import { DatosFormaPago } from './components/DatosFormaPago';
import { DatosContingencia } from './components/DatosContingencia';
import { useEmision } from './core/EmisionContext';
import { CreateCpe, PrevisualizeCpe } from './services/EmisionService';
import { useAuth } from '../auth';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { pdfjs } from 'react-pdf';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../../../_metronic/assets/css/style.css';

const profileBreadCrumbs = [
  {
    title: 'Busqueda',
    path: '/emision/factura',
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
  const { currentEmisor } = useAuth();

  const { datosCpe, datosReceptor, datosItem, datosTotales, datosAdicionales, datosContingencia, datosDocRel, datosFormaPago, datosReferencia,
    CleanDatosCpe, CleanDatosReceptor, CleanItem, CleanDatosTotales, CleanDatosAdicionales, CleanDatosContingencia, CleanFormaPago, CleanDocRel, CleanDatosReferencia } = useEmision();

  const cleanData = async () => {
    CleanDatosContingencia()
    CleanDatosCpe()
    CleanDatosReceptor()
    CleanDatosAdicionales()
    CleanDatosTotales()
    CleanItem()
    CleanFormaPago()
    CleanDocRel()
  };

  const { urlcpe } = props;

  const manejarSubmit = async (event, data) => {
    console.log({data})
    console.log({datosReferencia})
    event.stopPropagation();

    let factura = {
      accion: 'test',
      datosContingencia,
      datosCpe,
      datosEmisor: {
        tipoDocumento: 6,
        rucEmisor: currentEmisor.rucEmisor
      },
      datosReceptor,
      datosReferencia,
      datosItem,
      datosAdicionales,
      datosFormaPago,
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
        <form className='form w-100' onSubmit={(e) => { e.preventDefault(); handleSubmit(manejarSubmit(e)) }} noValidate id='kt_login_signin_form'>

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


const NotaCreditoPage = () => {

  const [modalShow, setModalShow] = useState(false);

  let { register, handleSubmit } = useForm();
  const { currentEmisor } = useAuth();
  const { datosCpe, datosReceptor, datosItem, datosTotales, datosAdicionales, datosContingencia, datosDocRel, datosFormaPago, datosReferencia,
    CleanDatosCpe, CleanDatosReceptor, CleanItem, CleanDatosTotales, CleanDatosAdicionales, CleanDatosContingencia, CleanFormaPago, CleanDocRel, CleanDatosReferencia } = useEmision();
  const [dataSerie, setDataSerie] = useState();
  const [urlCpe, setUrlCpe] = useState();
  const [cpe, setCpe] = useState();
  const [loadingPrevisualize, setLoadingPrevisualize] = useState(false);

  const getSerieEmisor = async () => {
    const serie = await getSerie({ rucEmisor: currentEmisor.rucEmisor });
    setDataSerie(serie);
  };

  const cleanData = async () => {
    CleanDatosReferencia()
    CleanDatosContingencia()
    CleanDatosCpe()
    CleanDatosReceptor()
    CleanDatosAdicionales()
    CleanDatosTotales()
    CleanItem()
    CleanFormaPago()
    CleanDocRel()
  };

  useEffect(() => {
    cleanData();
    getSerieEmisor();

  }, [])

  const manejarSubmit = async (data) => {
    console.log({data})
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

    if (!datosReferencia || !datosReferencia.tipoCpe) {
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar el Tipo de Comprobante de Referencia",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }

    if (!datosReferencia || !datosReferencia.serieDocumento) {
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Serie del Comprobante de Referencia",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }
    if (!datosReferencia || !datosReferencia.numeroDocumento) {
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Número del Comprobante de Referencia",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }


    if (!datosReferencia || !datosReferencia.fechaCpeRef) {
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Fecha del Comprobante de Referencia",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }
    if (!datosReferencia || !datosReferencia.tipoNotaCredito) {
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar el Tipo de Nota de Crédito",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }
    if (!datosReferencia || !datosReferencia.descripcion) {
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Motivo de la Nota de Crédito",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }

    if (!datosItem || datosItem.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Debe agregar al menos un ítem",
        showConfirmButton: false,
        timer: 5000
      })
      return false;
    }

    if (datosCpe.formaPago == '02') {
      if (!datosFormaPago || datosFormaPago.length == 0) {
        Swal.fire({
          icon: "error",
          title: "Si la Forma de Pago es Crédito, debe agregar al menos una cuota",
          showConfirmButton: false,
          timer: 5000
        })
        return false;
      }
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
          color: 'white',
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
      datosEmisor: {
        tipoDocumento: 6,
        rucEmisor: currentEmisor.rucEmisor
      },
      datosReceptor,
      datosReferencia,
      datosItem,
      datosAdicionales,
      datosFormaPago,
      datosDocRel,
      datosTotales
    }

    console.log(factura);
    setCpe(factura);
    setLoadingPrevisualize(true)
    const cpe = await PrevisualizeCpe(factura);
    setLoadingPrevisualize(false)
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
              <DatosEmisor tipoCpe="NOTA DE CRÉDITO" />
              <DatosContingencia />
              <DatosEmision tipoCpe="07" />
              <DatosReceptor tipoDocumento="6" />
              <DatosReferencia />
              <DatosDetalle />
              <DatosDocRelacionado />
              <DatosAdicionales />
              {
                datosCpe.formaPago == '01' ?
                  (<></>) :
                  (<DatosFormaPago />)
              }
              <DatosTotales />
              <form onSubmit={handleSubmit(manejarSubmit)}>

                <div className='fs-4 text-gray-800 d-flex justify-content-end mt-4'>
                  <label className='d-flex align-items-center form-label mb-3 invisible'>
                    .
                  </label>
                  <button type="submit" className={`btn ${loadingPrevisualize && 'btn-loading'} btn-dark mb-1 w-250px`}> Previsualizar</button>
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
export default NotaCreditoPage
