import { useForm } from "react-hook-form"; 

import { useState,useEffect } from 'react'
 
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import {useEmision} from '../core/EmisionContext'; 

import Swal from 'sweetalert2';
import moment from 'moment'; 

const DatosFormaPago = () => {

  
let { register, handleSubmit } = useForm();   

const { AddFormaPago,DeleteFormaPago, datosFormaPago } = useEmision();
  
const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");

  const manejarSubmit = async (data) => {    
 
    if (!data || !data.montocouta) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el monto de la cuota",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!data || !data.fechacouta) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la fecha de la cuota",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }
 
    data.codigocuota = 'Cuota' + lpad((datosFormaPago.length+1).toString(), 3, '0'); 

    AddFormaPago(data);
  }

  const FormaPagoDelete = (formapago) => { 
    console.log(formapago)
    DeleteFormaPago(formapago);
  };
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-3'> 

    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header><h3 className='fw-bolder text-dark'>FORMA DE PAGO</h3></Accordion.Header>
      <Accordion.Body>
 

            <form onSubmit={handleSubmit(manejarSubmit)}>   
                 
                <Row className="mb-3"> 
                  <Col xs="auto">
                  <Form.Group as={Col} controlId="formMonto"> 
                      <Form.Control size="sm"  type="decimal" placeholder="Monto Couta"  {...register('montocouta', { required: true })} />
                    </Form.Group>
                  </Col> 
  
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formFecha">
                      <Form.Control size="sm"  type="date" defaultValue={fechaActual} {...register('fechacouta', { required: true })} />
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
                                      <th style={{ width: '100px'}}><h6><strong>Número Cuota</strong></h6></th> 
                                      <th style={{ width: '100px'}}><h6><strong>Monto Cuota</strong></h6></th> 
                                      <th style={{ width: '500px'}}><h6><strong>Fecha Cuota</strong></h6></th>  
                                    </tr>
                                </thead>
                                <tbody>  

                                {
                                    datosFormaPago.map((item,i) => (
                                        <tr key={i}> 
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{i+1}</td>
                                            <td style={{ width: '140px'}}><button type="submit" className="btn btn-dark btn-sm" onClick={() => FormaPagoDelete(item.codigocuota)} >Eliminar</button></td>
                                            <td style={{ width: '200px', verticalAlign : 'middle'}}>{item.codigocuota}</td>
                                            <td style={{ width: '200px', verticalAlign : 'middle'}}>{item.montocouta}</td>
                                            <td style={{ width: '200px', verticalAlign : 'middle'}}>{item.fechacouta}</td> 
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

function lpad(str, length, padChar) {
  const padLength = length - str.length;
  if (padLength <= 0) {
    return str;
  }
  return padChar.repeat(padLength) + str;
}


export {DatosFormaPago}
