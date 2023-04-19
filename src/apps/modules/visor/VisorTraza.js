import React, {useEffect, useState} from 'react' 
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'; 
import {GetEventos} from '../cpe/busqueda/services/CpeService'; 
import { useParams } from 'react-router-dom';
import {CpeLoading} from '../../modules/loading/CpeLoading' 
import moment from 'moment';  
 

const VisorTraza = () => { 

  const { id } = useParams();
  const [dataCpe, setDataCpe] = useState();
  const [dataEventos, setDataEventos] = useState();

  var formatDate = "YYYY-MM-DD"; 
  var formatDateTime = "YYYY-MM-DD hh:mm:ss"; 
   
  const getEvents = async () => {   
    const data = {
        "id": id
    }   
    const eventos = await GetEventos(data);    

    console.log(eventos.eventos);

    setDataCpe(eventos.cpe)
    setDataEventos(eventos.eventos) 
  }  

  const getTipoCPE = (tipocpe) => {    
    switch (tipocpe) {
        case "01":
          return "FACTURA";
        case "03":
          return "BOLETA"; 
        case "07":
          return "N. CRÉDITO"; 
        case "08":
          return "N. DÉBITO"; 
        case "09":
          return "GUÍA";  
        case "20":
          return "RETENCIÓN"; 
        case "40":
          return "PERCEPCIÓN"; 
      }
  }  

  const getTipoEvento = (tipoevento) => {    
    switch (tipoevento) {
        case "REGISTER":
          return "PUBLICACIÓN";
        case "PROCESS":
          return "PROCESAMIENTO"; 
        case "SENDCPE":
          return "ENVÍO SUNAT"; 
        case "MAIL":
          return "ENVÍO CORREO";  
      }
  }  

  useEffect(() => {   
    getEvents() 
  }, [])  
  
  
  return (  
    <>

          {
              dataCpe
              ? 
              (  

                <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12"> 
                <center> 
                    <h3 className='pt-8'><strong>Traza</strong></h3>
                </center>
     
                <center>  
     
                    <div className="col-md-8 col-sm-12 col-lg-8 col-xs-12 col-md-offset-2 col-lg-offset-2"> 
                        <div className='notice d-flex bg-light rounded border-light border border-dashed p-2' > 
                            <div className='d-flex flex-stack flex-grow-1 justify-content-center'>
                            <div className='fw-bold d-flex flex-column'>  
                                <div className='d-flex justify-content-center'>
                                    <h4 className='fs-1 pt-2 text-gray-800 fw-bolder'>  {getTipoCPE(dataCpe.tipoCpe)}  ELECTRÓNICA N° {dataCpe.serieCpe}-{dataCpe.numeroCpe}</h4></div> 
                                    <div className='flex-grow-1'>
                                        <div className='d-flex justify-content-between align-items-start flex-wrap' >
                                            <div className='d-flex flex-column'> 
                                                <div className='d-flex my-8'> 
                                                    <p><strong>Fecha Emisión: {moment(dataCpe.fechaCpe).format(formatDate)}</strong></p>
                                                </div>  
                                            </div> 
                                            <div className='d-flex flex-column'>
                                                <div className='d-flex my-8'> 
                                                    <p>Fecha Publicación: {moment(dataCpe.fechaPublicacion).format(formatDateTime)}</p>
                                                </div>
                                            </div>    
                                        </div> 
                                    </div>  
                                </div>
                            </div>
                        </div>  
                               
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>DATOS DEL DOCUMENTO</Accordion.Header>
                                <Accordion.Body>
                                    <div className='align-items-start' > 
                                    <div className='d-flex'> 
                                            <h5><strong>Emisor:</strong></h5>
                                        </div>
                                        <div className='d-flex'> 
                                            <p>{dataCpe.rucEmisor} - {dataCpe.nombreEmisor}<br></br> </p>
                                        </div> 
                                        <div className='d-flex'> 
                                            <h5><strong>Receptor:</strong></h5>
                                        </div>
                                        <div className='d-flex'> 
                                            <p>{dataCpe.rucReceptor} - {dataCpe.nombreReceptor} <br></br> </p>    
                                        </div>  
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item> 
                        </Accordion> 

                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>EVENTOS</Accordion.Header>
                                <Accordion.Body>

                                <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr> 
                                            <th><h6><strong>Evento</strong></h6></th>
                                            <th><h6><strong>Fecha</strong></h6></th>
                                            <th><h6><strong>Detalle</strong></h6></th> 
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            {dataEventos.map((evento) => (
                                            <tr key={evento._id}> 
                                                <td className="td-auto">{getTipoEvento(evento.tipo)}</td>
                                                <td style={{ width: '160px'}}>{moment(evento.fechaHora).format(formatDateTime)}</td>
                                                <td className="td-auto">{evento.detalleEvento}</td>
                                            </tr> 
                                            ))} 
                                        </tbody>
                                    </Table>

                                </Accordion.Body>
                            </Accordion.Item> 
                        </Accordion> 
                                    
     
                    </div> 
                </center> 
            </div>

              ) 
              :
              (
                <CpeLoading />
              )
          } 
 
    </> 
  )
}

export {VisorTraza}
