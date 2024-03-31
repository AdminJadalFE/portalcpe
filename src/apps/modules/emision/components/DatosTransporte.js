import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment'; 

import { useEmision } from '../core/EmisionContext';

const DatosTransporte = ({ tipoDocumento }) => {
  const { setTransporteDatos } = useEmision();

  const { datosEnvio } = useEmision();

  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");

  const [ tipoDoc, setTipoDoc ] = useState(0);
  const [fechaTraslado, setFechaTraslado] = useState(fechaActual); 

  const setVehiculo = (event) => {
    setTransporteDatos('vehiculoPlaca', event.target.value);
  };
  const setConductorID = (event) => {
    setTipoDoc(event.target.value)
    setTransporteDatos('conductorID', event.target.value);
  };
  const setConductorDocumento = (event) => {
    setTransporteDatos('conductorDocumento', event.target.value);
  };
  const setConductorNombre = (event) => {
    setTransporteDatos('conductorNombre', event.target.value);
  };
  const setConductorCompanyId = (event) => {
    setTransporteDatos('conductorCompanyId', event.target.value);
  };
  const setConductorMtc = (event) => {
    setTransporteDatos('conductorMtc', event.target.value);
  };
  
  const setConductorNombres = (event) => {
    setTransporteDatos('conductorNombres', event.target.value);
  };
  const setConductorApellidos = (event) => {
    setTransporteDatos('conductorApellidos', event.target.value);
  };    
  const setConductorTitle = (event) => {
    setTransporteDatos('conductorTitle', event.target.value);
  };
  const setConductorLicencia = (event) => {
    setTransporteDatos('conductorLicencia', event.target.value);
  };    
  const setVehiculoPlaca = (event) => {
    setTransporteDatos('vehiculoPlaca', event.target.value);
  };
  const setVehiculoPlacaSecundario = (event) => {
    setTransporteDatos('vehiculoPlacaSecundario', event.target.value);
  };                                      

  const handleFechaTrasladoChange = (event) => {
    console.log('event',event);
    setFechaTraslado(event.target.value);
    setTransporteDatos('trasladoFecha', event.target.value); 
  };
  useEffect(() => {
    setTransporteDatos('conductorID', tipoDocumento);
    setTipoDoc(tipoDocumento);
  }, []);

  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'>

          {/* Transporte público */}
          {datosEnvio.modalidadTransporte === '01' ? (
            <Form>
              <Row className='mt-3'>
                <div>
                  <h3 className='fw-bolder text-dark'>DATOS DEL CHOFER</h3>
                </div>
              </Row>

              <Row className='mb-3'>
              <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaCpe">
                    <label className="d-flex align-items-center form-label mb-3">
                      Fecha de inicio del traslado
                    </label>
                    <Form.Control
                      size="sm"
                      type="date"
                      defaultValue={fechaActual}
                      value={fechaTraslado} 
                      onChange={handleFechaTrasladoChange} 
                    />
                  </Form.Group>
                </Col>
                <Col xs='auto'>
                  <Form.Group as={Col} controlId='formTipoDocumento'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Tipo de Doc.
                    </label>                    
                    <Form.Select size='sm' value={6} onChange={setConductorID}>
                      <option value='6'>RUC</option>
                      <option value='1'>DNI</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs='auto'>
                  <Form.Group as={Col} controlId='formNumeroDocumento'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Número de Documento
                    </label>                        
                    <Form.Control size='sm' type='text' placeholder='Número Documento' onChange={setConductorDocumento} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='formRazonSocial' lg={2}>
                    <label className="d-flex align-items-center form-label mb-3">
                      Razón Social o Nombre
                    </label>                               
                    <Form.Control size='sm' type='text' placeholder='Razón Social o Nombre' onChange={setConductorNombre} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col xs={6}>
                  <Form.Group controlId='formConductorMtc'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Número de Registro MTC
                    </label>           
                    <Form.Control size='sm' type='text' placeholder='Número de registro MTC' onChange={setConductorCompanyId} />
                  </Form.Group>
                </Col>
              </Row>

            </Form>
          ) :  (
            <Form>
              {/* Transporte privado */}
              <Row className='mt-3'>
                <div>
                  <h3 className='fw-bolder text-dark'>DATOS DEL CHOFER</h3>
                </div>
              </Row>

              <Row className='mb-3'>
              <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaCpe">
                    <label className="d-flex align-items-center form-label mb-3">
                      Fecha de inicio del traslado
                    </label>
                    <Form.Control
                      size="sm"
                      type="date"
                      defaultValue={fechaActual}
                      value={fechaTraslado} 
                      onChange={handleFechaTrasladoChange} 
                    />
                  </Form.Group>
                </Col>
                <Col xs='auto'>
                  <Form.Group as={Col} controlId='formTipoDocumento'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Tipo de Doc.
                    </label>                            
                    <Form.Select size='sm' value={1} onChange={setConductorID}>
                      <option value='1'>DNI</option>
                      <option value='6'>RUC</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs='auto'>
                  <Form.Group as={Col} controlId='formNumeroDocumento'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Número de Documento
                    </label>                             
                    <Form.Control size='sm' type='text' placeholder='Número Documento' onChange={setConductorDocumento} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col xs={4}>
                  <Form.Group controlId='formVehiculo'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Nombres del Conductor
                    </label>    
                    <Form.Control size='sm' type='text' placeholder='Placa del Vehículo' onChange={setConductorNombres} />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId='formConductorMtc'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Apellidos del Conductor
                    </label>                     
                    <Form.Control size='sm' type='text' placeholder='Númerto de registro MTC' onChange={setConductorApellidos} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col xs={4}>
                  <Form.Group controlId='formConductorCompanyId'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Licencia del Conductor
                    </label>                              
                    <Form.Control size='sm' type='text' placeholder='Número de registro(MTC)' onChange={setConductorLicencia} />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId='formConductorCompanyId'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Placa del Vehículo
                    </label>                              
                    <Form.Control size='sm' type='text' placeholder='Número de registro(MTC)' onChange={setVehiculoPlaca} />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId='formConductorCompanyId'>
                    <label className="d-flex align-items-center form-label mb-3">
                      Placa del Vehículo Secundario
                    </label>                              
                    <Form.Control size='sm' type='text' placeholder='Número de registro(MTC)' onChange={setVehiculoPlacaSecundario} />
                  </Form.Group>
                </Col>                                
              </Row>
            </Form>
          )}
      </div>
    </div>
  );
};

export { DatosTransporte };
