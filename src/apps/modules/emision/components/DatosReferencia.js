import React, {useEffect,useState} from 'react';   
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment'; 
 
import {useEmision} from '../core/EmisionContext';
import {getTipoNota} from '../services/EmisionService';  

const DatosReferencia = () => {
  
  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");

  const [ tipoNota, setTipoNota ] = useState([]);

  const { setReferenciaDatos, setCpeDatos } = useEmision();
   
  const setTipoCpe = (event) => { 
    setReferenciaDatos('tipoCpe', event.target.value) 
  };
  const setSerieDocumento = (event) => { 
    setReferenciaDatos('serieDocumento', event.target.value) 
  };
  const setNumeroDocumento = (event) => { 
    setReferenciaDatos('numeroDocumento', event.target.value) 
  };
  const setFechaCpeRef = (event) => { 
    setReferenciaDatos('fechaCpeRef', event.target.value) 
  }; 
  const setTipoNotaCredito = (event) => { 
    let codTipoNota = event.target.value;
    setReferenciaDatos('tipoNotaCredito', codTipoNota) 
    if (codTipoNota == '13') {
      setFormaPago('02');
    } else {
      setFormaPago('01');
    }
  };
  const setDescripcion = (event) => { 
    setReferenciaDatos('descripcion', event.target.value) 
  }; 
  const setFormaPago= (codTipoNota) => { 
    setCpeDatos('formaPago', codTipoNota) 
  };
   
  const getData = async () => { 
    const listTipoNota = await getTipoNota(); 
    setTipoNota(listTipoNota);
  };

  useEffect(() => {   
    getData();
    setReferenciaDatos('tipoCpe', "01");
  }, [])  

  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 
         
            <Form>

            <Row className="mt-3"> 
                <div>
                    <h3 className='fw-bolder text-dark'>DATOS DEL COMPROBANTE DE REFERENCIA</h3>
                </div>
              </Row>

              <Row className="mb-3"> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formTipoCpe">
                      <Form.Select  size="sm" onChange={setTipoCpe}>
                        <option value="01">FACTURA</option>
                        <option value="03">BOLETA</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formSerieDocumento"> 
                      <Form.Control  size="sm" type="text" placeholder="Serie Documento" onChange={setSerieDocumento}/>
                    </Form.Group>
                  </Col> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formNumeroDocumento"> 
                      <Form.Control  size="sm" type="text" placeholder="Número Documento" onChange={setNumeroDocumento}/>
                    </Form.Group>
                  </Col> 
                  <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaCpeRef"> 
                      <Form.Control size="sm"  type="date" defaultValue={fechaActual} onChange={setFechaCpeRef}/>
                  </Form.Group>  
                </Col> 
                <Col xs="auto">
                    <Form.Group as={Col} controlId="formTipoDocumento">
                      <Form.Select  size="sm" onChange={setTipoNotaCredito}>
                      {
                        tipoNota.map((tiponota,i) => (
                                <option key={i} value={tiponota.codigoTipoNota}>{tiponota.descripcionTipoNota}</option>
                            ))
                        }
                      </Form.Select>
                    </Form.Group>
                </Col>   
              </Row> 

              <Row className="mb-3">    
                <Col>
                  <Form.Group  controlId="formDescripcion" lg={2}> 
                    <Form.Control  size="sm" type="text" placeholder="Descripcion" onChange={setDescripcion}/>
                  </Form.Group>
                </Col>   
              </Row>

            </Form> 
 
 
      </div>
    </div>
  )
}

export {DatosReferencia}
