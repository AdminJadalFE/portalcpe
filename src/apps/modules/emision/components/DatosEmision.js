import React, {useState, useEffect, useContext} from 'react';  
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import moment from 'moment'; 
 
import {useEmision} from '../core/EmisionContext';

const DatosEmision = () => {

  const { setCpeDatos } = useEmision();
 
  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");
  
  const setFechaCpe = (event) => { 
    setCpeDatos('fechaCpe', event.target.value) 
  };

  const setFechaVencimiento = (event) => { 
    setCpeDatos('fechaVencimiento', event.target.value) 
  };

  const setMoneda= (event) => { 
    setCpeDatos('moneda', event.target.value) 
  };
  
  return (
    
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 
         
            <Form>

              <Row className="mt-3"> 
                <div>
                    <h3 className='fw-bolder text-dark'>DATOS DE EMISIÓN</h3>
                </div>
              </Row>

              <Row className="mb-3">  
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaCpe"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        Fecha Emisión
                      </label>
                      <Form.Control size="sm"  type="date" defaultValue={fechaActual} onChange={setFechaCpe}/>
                  </Form.Group>  
                </Col> 
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaVencimiento"> 
                    <label className='d-flex align-items-center form-label mb-3'>
                      Fecha Vencimiento
                    </label>  
                    <Form.Control size="sm"  type="date" defaultValue={fechaActual} onChange={setFechaVencimiento}/> 
                  </Form.Group>
                </Col>  
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formGridEmail">
                  <label className='d-flex align-items-center form-label mb-3'>
                      Moneda
                    </label>
                    <Form.Select  size="sm"  defaultValue="PEN" onChange={setMoneda}>
                      <option>PEN</option>
                      <option>USD</option>
                    </Form.Select>
                  </Form.Group>
                </Col> 
              </Row> 
            </Form>  
 
      </div>
    </div>
  )
}

export {DatosEmision}
