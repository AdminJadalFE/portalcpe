import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useEmision } from '../core/EmisionContext';

const DatosTransporte = ({ tipoDocumento }) => {
  const { setTransporteDatos } = useEmision();

  const [tipoDoc, setTipoDoc] = useState(0);

  const setVehiculo = (event) => {
    setTransporteDatos('vehiculo', event.target.value);
  };
  const setConductorID = (event) => {
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

  useEffect(() => {
    setTransporteDatos('tipoDocumento', tipoDocumento);
    setTipoDoc(tipoDocumento);
  }, []);

  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'>
        <Form>
          <Row className='mt-3'>
            <div>
              <h3 className='fw-bolder text-dark'>DATOS DEL CHOFER</h3>
            </div>
          </Row>

          <Row className='mb-3'>
            <Col xs='auto'>
              <Form.Group as={Col} controlId='formTipoDocumento'>
                <Form.Select size='sm' value={tipoDoc} onChange={setTipoDoc}>
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
            <Col xs={9}>
              <Form.Group controlId='formVehiculo'>
                <Form.Control size='sm' type='text' placeholder='Vehículo' onChange={setVehiculo} />
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group controlId='formConductorID'>
                <Form.Control size='sm' type='text' placeholder='ID del Conductor' onChange={setConductorID} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col xs={9}>
              <Form.Group controlId='formConductorCompanyId'>
                <Form.Control size='sm' type='text' placeholder='ID de la Compañía del Conductor' onChange={setConductorCompanyId} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { DatosTransporte };
