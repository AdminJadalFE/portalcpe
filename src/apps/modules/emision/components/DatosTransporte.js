import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment'; 

import { useEmision } from '../core/EmisionContext';

import Swal from 'sweetalert2';

const DatosTransporte = ({ tipoDocumento }) => {
  const { setTransporteDatos } = useEmision();

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
        <Form onSubmit={manejarSubmit}>
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
                <Form.Select size='sm' value={tipoDoc} onChange={setConductorID}>
                  <option value='6'>RUC</option>
                  <option value='1'>DNI</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs='auto'>
              <Form.Group as={Col} controlId='formNumeroDocumento'>
                <Form.Control size='sm' type='text' placeholder='Número Documento' onChange={setConductorDocumento} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formRazonSocial' lg={2}>
                <Form.Control size='sm' type='text' placeholder='Razón Social o Nombre' onChange={setConductorNombre} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col xs={6}>
              <Form.Group controlId='formVehiculo'>
                <Form.Control size='sm' type='text' placeholder='Placa del Vehículo' onChange={setVehiculo} />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId='formConductorMtc'>
                <Form.Control size='sm' type='text' placeholder='Númerto de registro MTC' onChange={setConductorMtc} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col xs={6}>
              <Form.Group controlId='formConductorCompanyId'>
                <Form.Control size='sm' type='text' placeholder='Número de registro(MTC)' onChange={setConductorCompanyId} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { DatosTransporte };
