
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import Accordion from 'react-bootstrap/Accordion'; 

import {useEmision} from '../core/EmisionContext'; 

const DatosAdicionales = () => {
 
  const { setAdicionalesDatos } = useEmision();
  
  const setObservacion = (event) => { 
    setAdicionalesDatos('observaciones', event.target.value) 
  };

  const setLibre1 = (event) => { 
    setAdicionalesDatos('libre1', event.target.value) 
  };

  const setValor1 = (event) => { 
    setAdicionalesDatos('valor1', event.target.value) 
  };

  const setLibre2 = (event) => { 
    setAdicionalesDatos('libre2', event.target.value) 
  };

  const setValor2 = (event) => { 
    setAdicionalesDatos('valor2', event.target.value) 
  };

  const setLibre3 = (event) => { 
    setAdicionalesDatos('libre3', event.target.value) 
  };

  const setValor3 = (event) => { 
    setAdicionalesDatos('valor3', event.target.value) 
  };
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-3'> 

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header><h3 className='fw-bolder text-dark'>DATOS ADICIONALES</h3></Accordion.Header>
        <Accordion.Body>
 
              <div className='d-flex flex-wrap flex-sm-nowrap'> 
          
                  <div className="container my-6">
                      <div className="row">
                        <div className="col-sm-6">
                          <label className='d-flex align-items-center form-label mb-3'>
                                    Observaciones
                          </label>
                          <textarea className="form-control" rows="8" onChange={setObservacion}></textarea>
                        </div> 
                        <div className="col-sm-6">

                        <Form className='mr-8'>   
                            <Row className="mb-3"> 
                              <Col xs="5">
                                <Form.Group as={Col} controlId="titulolibre1"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Titulo Libre 1
                                  </label>
                                  <Form.Control size="sm" type="text" onChange={setLibre1}/>
                                </Form.Group>
                              </Col>  
  
                              <Col xs="5">
                                <Form.Group as={Col} controlId="valorlibre1"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Valor Libre 1
                                  </label>
                                  <Form.Control size="sm" type="text" onChange={setValor1}/>
                                </Form.Group>
                              </Col>   
                            </Row>  
                            <Row className="mb-3"> 
                              <Col xs="5">
                                <Form.Group as={Col} controlId="titulolibre2"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Titulo Libre 2
                                  </label>
                                  <Form.Control size="sm" type="text"  onChange={setLibre2}/>
                                </Form.Group>
                              </Col>  
                              <Col xs="5">
                                <Form.Group as={Col} controlId="valorlibre2"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Valor Libre 2
                                  </label>
                                  <Form.Control size="sm" type="text" onChange={setValor2}/>
                                </Form.Group>
                              </Col>   
                            </Row>  
                            <Row className="mb-3"> 
                              <Col xs="5">
                                <Form.Group as={Col} controlId="titulolibre3"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Titulo Libre 3
                                  </label>
                                  <Form.Control size="sm" type="text"  onChange={setLibre3}/>
                                </Form.Group>
                              </Col>  
                              <Col xs="5">
                                <Form.Group as={Col} controlId="valorlibre3"> 
                                  <label className='d-flex align-items-center form-label mb-3'>
                                    Valor Libre 3
                                  </label>
                                  <Form.Control size="sm" type="text" onChange={setValor3}/>
                                </Form.Group>
                              </Col>   
                            </Row>  
                        </Form> 

                        </div>
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

export {DatosAdicionales}
