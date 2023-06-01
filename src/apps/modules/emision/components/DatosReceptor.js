import React, {useEffect,useState} from 'react';   
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {useEmision} from '../core/EmisionContext';


const DatosReceptor = ({tipoDocumento}) => {
  
  const { setReceptorDatos } = useEmision();

  const [ tipoDoc, setTipoDoc ] = useState(0);

  const setTipoDocumento = (event) => { 
    setReceptorDatos('tipoDocumento', event.target.value) 
  };
  const setNumeroDocumento = (event) => { 
    setReceptorDatos('numeroDocumento', event.target.value) 
  };
  const setRazonSocial = (event) => { 
    setReceptorDatos('razonSocial', event.target.value) 
  };
  const setDireccion = (event) => { 
    setReceptorDatos('direccion', event.target.value) 
  };
  const setCorreo = (event) => { 
    setReceptorDatos('correo', event.target.value) 
  };


  useEffect(() => {   
    setReceptorDatos('tipoDocumento', tipoDocumento)  
    setTipoDoc(tipoDocumento)
  }, [])  
  

  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 
         
            <Form>

            <Row className="mt-3"> 
                <div>
                    <h3 className='fw-bolder text-dark'>DATOS DEL RECEPTOR</h3>
                </div>
              </Row>

              <Row className="mb-3"> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formTipoDocumento">
                      <Form.Select  size="sm" value={tipoDoc} onChange={setTipoDocumento}>
                        <option value="6">RUC</option>
                        <option value="1">DNI</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formNumeroDocumento"> 
                      <Form.Control  size="sm" type="text" placeholder="Número Documento" onChange={setNumeroDocumento}/>
                    </Form.Group>
                  </Col> 
                  <Col>
                    <Form.Group  controlId="formRazonSocial" lg={2}> 
                      <Form.Control  size="sm" type="text" placeholder="Razón Social" onChange={setRazonSocial}/>
                    </Form.Group>
                  </Col>  
              </Row> 

              <Row className="mb-3">    
                <Col>
                  <Form.Group  controlId="formDireccion" lg={2}> 
                    <Form.Control  size="sm" type="text" placeholder="Dirección" onChange={setDireccion}/>
                  </Form.Group>
                </Col>   
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formCorreo"> 
                    <Form.Control  size="sm" type="email" placeholder="correo@receptor.pe" onChange={setCorreo}/>
                  </Form.Group>
                </Col> 
              </Row>

            </Form> 
 
 
      </div>
    </div>
  )
}

export {DatosReceptor}
