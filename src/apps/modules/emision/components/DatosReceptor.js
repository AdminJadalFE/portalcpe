import React, { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useEmision } from "../core/EmisionContext";

import { ConsultaRuc } from "../services/EmisionService";

const DatosReceptor = ({ tipoDocumento }) => {
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [direccion, setDireccion] = useState("");

  const { setReceptorDatos, datosReceptor } = useEmision();

  const [tipoDoc, setTipoDoc] = useState(0);

  const razonSocialInputRef = useRef(null);
  const direccionInputRef = useRef(null);

  const setTipoDocumento = (event) => {
    setTipoDoc(event.target.value);
    setReceptorDatos("tipoDocumento", event.target.value);
  };
  const setNumeroDocumentoValue = (event) => {
    setNumeroDocumento(event.target.value);
    setReceptorDatos("numeroDocumento", event.target.value);
  };
  const setRazonSocialValue = (event) => {
    setRazonSocial(event.target.value);
    setReceptorDatos("razonSocial", event.target.value);
  };

  const setDireccionValue = (event) => {
    setDireccion(event.target.value);
    setReceptorDatos("direccion", event.target.value);
  };
  const setCorreo = (event) => {
    setReceptorDatos("correo", event.target.value);
  };

  const ConsultarRuc = async () => {
    //consulta RUC
    if(tipoDoc==6){
      const data = {
        accion: "consultar",
        ruc: numeroDocumento,
      };
      console.log("data", data);
      setRazonSocial('');
      setDireccion('');
      try {
        let content = await ConsultaRuc(data);
        console.log("Resultado de la consulta:1", content);
        if (content) {
          if (content.razonSocial) {
            setRazonSocial(content.razonSocial);
            setDireccion(content.direccion);
            console.log(
              "setReceptorDatos",
              setReceptorDatos("razonSocial", content.razonSocial)
            );
          }
          direccionInputRef.current.focus();
  
          console.log("Resultado de la consulta:2", content);
          console.log("Contenido del contexto:2", datosReceptor);
        }
      } catch (error) {
        console.error("Error en la consulta:3", error);
      }
    }
    //Consulta DNI
    else{
      const data = {
        accion: "consultar",
        dni: numeroDocumento,
      };
      console.log("data", data);
      setRazonSocial('');
      setDireccion('');
      try {
        let content = await ConsultaRuc(data);
        console.log("Resultado de la consulta:1", content);
        if (content) {
          if(content.nombres)
          {
            setRazonSocial(content.nombres +' '+ content.apellidoPaterno +' '+ content.apellidoMaterno);
          }
          razonSocialInputRef.current.focus();
  
          console.log("Resultado de la consulta:2", content);
          console.log("Contenido del contexto:2", datosReceptor);
        }
      } catch (error) {
        console.error("Error en la consulta:3", error);
      }
    }
  };

  useEffect(() => {
    setReceptorDatos("tipoDocumento", tipoDocumento);
    setTipoDoc(tipoDocumento);
  }, []);

  return (
    <div className="card mb-2">
      <div className="card-body pt-1 pb-0">
        <Form>
          <Row className="mt-3">
            <div>
              <h3 className="fw-bolder text-dark">DATOS DEL RECEPTOR</h3>
            </div>
          </Row>

          <Row className="mb-3">
            <Col xs={2}>
              <Form.Group as={Col} controlId="formTipoDocumento">
                <Form.Select
                  size="sm"
                  value={tipoDoc}
                  onChange={setTipoDocumento}
                >
                  <option value="6">RUC</option>
                  <option value="1">DNI</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group as={Col} controlId="formNumeroDocumento">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Número Documento"
                  onChange={setNumeroDocumentoValue}
                />
              </Form.Group>
            </Col>
            <Col xs={1}>
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={() => {
                  ConsultarRuc();
                }}
              >
                Consultar
              </button>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="formRazonSocial" lg={2}>
                <Form.Control
                  ref={razonSocialInputRef}
                  value={razonSocial}
                  size="sm"
                  type="text"
                  placeholder="Razón Social"
                  onChange={setRazonSocialValue}
                  onBlur={setRazonSocialValue}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formDireccion" lg={2}>
                <Form.Control
                  ref={direccionInputRef}
                  value={direccion}
                  size="sm"
                  type="text"
                  placeholder="Dirección"
                  onChange={setDireccionValue}
                  onBlur={setDireccionValue}
                />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group as={Col} controlId="formCorreo">
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="correo@receptor.pe"
                  onChange={setCorreo}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { DatosReceptor };
