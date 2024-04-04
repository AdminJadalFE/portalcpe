import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FetchConf, URL_BACK } from "../../../../src/apps/BackConfig"; // Importa URL_BACK desde BackConfig

const RegisterUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {
    try {
      const response = await fetch(URL_BACK + "auth/user/register", {
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
    try {
      const response = await registerUser(data);
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
        <h1>Registrar Usuario a empresa</h1>
      <Form.Group className="mb-3" controlId="emailUsuario">
        <Form.Label>Email Usuario</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese el email del usuario"
          {...register("emailUsuario", { required: true })}
        />
        {errors.emailUsuario && (
          <span className="text-danger">Este campo es requerido.</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="nombreUsuario">
        <Form.Label>Nombre Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre del usuario"
          {...register("nombreUsuario", { required: true })}
        />
        {errors.nombreUsuario && (
          <span className="text-danger">Este campo es requerido.</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="claveUsuario">
        <Form.Label>Clave Usuario</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese la clave del usuario"
          {...register("claveUsuario", { required: true })}
        />
        {errors.claveUsuario && (
          <span className="text-danger">Este campo es requerido.</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="rucEmisor">
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

      <Form.Group className="mb-3" controlId="razonSocial">
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

      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  );
};

export default RegisterUserPage;
