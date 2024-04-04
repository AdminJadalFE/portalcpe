import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FetchConf, URL_BACK } from "../../../../src/apps/BackConfig"; // Importa URL_BACK desde BackConfig

const RegisterCompanyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validador, setValidador] = useState("");

  const registerCompany = async (data) => {
    try {
      const response = await fetch(URL_BACK + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (!validador) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, seleccione un validador.",
      });
      return;
    }

    const claveEmisorValue =
      "$2a$10$4GP9HZ/hKBD9K15LfM0hPuY8TEPnDVWqzQG3lm5W5ydKLpT6FZrV6";

    try {
      data.validador = validador;
      data.claveEmisor = claveEmisorValue;

      const response = await registerCompany(data);
      console.log(response);
      if (response === "OK") {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Los datos se han enviado correctamente.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: "Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Hubo un problema al enviar los datos. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Registrar Empresa</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="rucEmisor">
          <Form.Label>RUC Emisor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el RUC del emisor"
            {...register("rucEmisor", { required: true })}
          />
          {errors.rucEmisor && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="razonSocial">
          <Form.Label>Razón Social</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la razón social"
            {...register("razonSocial", { required: true })}
          />
          {errors.razonSocial && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="claveCertificado">
          <Form.Label>Clave Certificado</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la clave del certificado"
            {...register("claveCertificado", { required: true })}
          />
          {errors.claveCertificado && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="usuarioSunat">
          <Form.Label>Usuario Sunat</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el usuario de Sunat"
            {...register("usuarioSunat", { required: true })}
          />
          {errors.usuarioSunat && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="claveSunat">
          <Form.Label>Clave Sunat</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese la clave de Sunat"
            {...register("claveSunat", { required: true })}
          />
          {errors.claveSunat && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="validador">
          <Form.Label>Validador</Form.Label>
          <Form.Control
            as="select"
            value={validador}
            onChange={(e) => setValidador(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="1">SUNAT</option>
            <option value="2">OSE</option>
          </Form.Control>
          {errors.validador && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="direccionEmisor">
          <Form.Label>Dirección Emisor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la dirección del emisor"
            {...register("direccionEmisor", { required: true })}
          />
          {errors.direccionEmisor && (
            <span className="text-danger">Este campo es requerido.</span>
          )}
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  );
};

export default RegisterCompanyPage;
