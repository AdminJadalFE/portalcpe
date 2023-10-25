import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import Accordion from 'react-bootstrap/Accordion';

import {useEmision} from '../core/EmisionContext'; 
 
const DatosContingencia = () => {
  
  const { setContingenciaDatos } = useEmision();
  
  const setContingencia = (event) => { 
    setContingenciaDatos('indContingencia', event.target.checked) 
  };
    
  const setSerieContingencia = (event) => { 
    setContingenciaDatos('serieContingencia', event.target.value) 
  };

  const setCorrelativoContingencia = (event) => { 
    setContingenciaDatos('correlativoContingencia', event.target.value) 
  };

  const setCodigoAutorizacion = (event) => { 
    setContingenciaDatos('codigoAutorizacion', event.target.value) 
  };
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-3'> 

    <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header><h3 className='fw-bolder text-dark'>EMISIÓN POR CONTINGENCIA</h3></Accordion.Header>
      <Accordion.Body>
 

            <form>   
                 
                <Row className="mb-3"> 

                <Col xs="auto"> 
                    <Form.Group as={Col} controlId="formAfectacion" > 
                      <label className='d-flex align-items-center form-label mb-3'>
                          Contingencia
                      </label>  
                      <div  className='d-flex align-items-center mt-5'>
                        <Form.Check type="switch" id="afectacion" onChange={setContingencia}/> 
                      </div>
 
                    </Form.Group>
                </Col> 

                  <Col xs="auto">
                    <Form.Group  controlId="formSerie" lg={2}> 
                      <label className='d-flex align-items-center form-label mb-3'>
                          Serie Contingencia
                      </label>  
                        <Form.Control  size="sm" type="text" placeholder="Serie" onChange={setSerieContingencia}/>
                      </Form.Group>
                  </Col> 

                  <Col xs="auto">
                    <Form.Group  controlId="formCorrelativo" lg={2}> 
                     <label className='d-flex align-items-center form-label mb-3'>
                          Correlativo Contingencia
                      </label> 
                        <Form.Control  size="sm" type="text" placeholder="Correlativo" onChange={setCorrelativoContingencia}/>
                      </Form.Group>
                  </Col> 
  
                  <Col xs="auto">
                    <Form.Group  controlId="formCodigoAutorizacion" lg={2}> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        Código Autorización Sunat
                      </label>  
                        <Form.Control  size="sm" type="text" placeholder="CodigoAutorizacion" onChange={setCodigoAutorizacion}/>
                      </Form.Group>
                  </Col> 
 
                </Row>
   
                </form> 
    
      </Accordion.Body>
    </Accordion.Item> 
  </Accordion>
  </div>
    </div>
  )
}

export {DatosContingencia}
