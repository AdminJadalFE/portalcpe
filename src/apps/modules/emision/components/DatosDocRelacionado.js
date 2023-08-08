import { useForm } from "react-hook-form"; 

import { useState,useEffect } from 'react'
 
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import {useEmision} from '../core/EmisionContext';
import {getTipoDocumentoRelacionado} from '../services/EmisionService';  

import Swal from 'sweetalert2';

const DatosDocRelacionado = () => {

  
let { register, handleSubmit } = useForm();   

const { AddDocRel,DeleteDocRel, datosDocRel } = useEmision();
  
const [ tipoDocRel, setTipoDocRel ] = useState([]);

  const manejarSubmit = async (data) => {    
  

    if (!data || !data.folioDocRel) { 
      Swal.fire({
        icon: "error",
        title: "Debe el Folio del Documento Relacionado",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!data || !data.codigoDocRel) { 
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar el Tipo de Documento Relacionado",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }
  
    AddDocRel(data);
  }

  const DocRelDelete = (docrel) => { 
    DeleteDocRel(docrel);
  };
 
  const getData = async () => { 
    const listTipoDocRel = await getTipoDocumentoRelacionado(); 
    setTipoDocRel(listTipoDocRel);
  };

  const getDescripcion = (codigoDocRel) => {  
    const docRelEncontrado = tipoDocRel.find(docrel => docrel.codigoTipoDocRel == codigoDocRel); 
    return docRelEncontrado ? docRelEncontrado.descripcionTipoDocRel : null;
  };
 
  useEffect(() => {   
    getData();
  }, [])  
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-3'> 

    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header><h3 className='fw-bolder text-dark'>DOCUMENTOS RELACIONADOS</h3></Accordion.Header>
      <Accordion.Body>
 

            <form onSubmit={handleSubmit(manejarSubmit)}>   
                 
                <Row className="mb-3"> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formFolio">  
                      <Form.Control size="sm"  type="text" placeholder="Serie - Número" {...register('folioDocRel', { required: true })} />
                    </Form.Group>
                  </Col> 


                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formTipo">
                      <Form.Select size="sm"  {...register('codigoDocRel', { required: true })}>
                        {
                        tipoDocRel.map((uni,i) => (
                                <option key={i} value={uni.codigoTipoDocRel}>{uni.descripcionTipoDocRel}</option>
                            ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>  
  
                  <Col xs="auto">
                    <button type="submit" className="btn btn-dark btn-sm w-150px ps-5">Agregar</button>
                  </Col> 


                </Row>
   
                </form> 
  
                  <div className='d-flex my-4'>  
                    <div className='d-flex bg-light rounded border-light border border-dashed pt-4'  style={{ width: '100%' }} > 
                        <div className='d-flex flex-stack flex-grow-1 justify-content-start mx-8'> 

                          <Table responsive striped bordered hover>
                                <thead >
                                    <tr> 
                                      <th style={{ width: '100px'}}><h6><strong>Ítem</strong></h6></th>
                                      <th style={{ width: '140px', border: 'none'}}><h6><strong>Acción</strong></h6></th>
                                      <th style={{ width: '200px'}}><h6><strong>Tipo</strong></h6></th>  
                                      <th style={{ width: '200px'}}><h6><strong>Folio</strong></h6></th>                                       
                                    </tr>
                                </thead>
                                <tbody>  

                                {
                                    datosDocRel.map((item,i) => (
                                        <tr key={i}> 
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{i+1}</td>
                                            <td style={{ width: '140px'}}><button type="submit" className="btn btn-dark btn-sm" onClick={() => DocRelDelete(item.codigoDocRel)} >Eliminar</button></td>
                                            <td style={{ width: '200px', verticalAlign : 'middle'}}>{getDescripcion(item.codigoDocRel)}</td>
                                            <td style={{ width: '200px', verticalAlign : 'middle'}}>{item.folioDocRel}</td> 
                                        </tr>  
                                          ))
                                    }
 
                                </tbody>
                            </Table>
 
                        </div> 
                      </div> 
                  </div>   
 
      </Accordion.Body>
    </Accordion.Item> 
  </Accordion>
  </div>
    </div>
  )
}

export {DatosDocRelacionado}
