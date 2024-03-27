import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useEmision } from "../core/EmisionContext";
import data from '../../data/ubigetoData';

const DatosEnvio = ({ tipoDocumento }) => {
  const { setEnvioDatos } = useEmision();
  const [ubigeoPartida, setUbigeoPartida] = useState('');
  const [ubigeoLlegada, setUbigeoLlegada] = useState('');
  const [selectedDepartmentPartida, setSelectedDepartmentPartida] = useState('');
  const [selectedProvincePartida, setSelectedProvincePartida] = useState('');
  const [selectedDistrictPartida, setSelectedDistrictPartida] = useState('');
  const [selectedDepartmentLlegada, setSelectedDepartmentLlegada] = useState('');
  const [selectedProvinceLlegada, setSelectedProvinceLlegada] = useState('');
  const [selectedDistrictLlegada, setSelectedDistrictLlegada] = useState('');
  const [departmentsPartida, setDepartmentsPartida] = useState([]);
  const [provincesPartida, setProvincesPartida] = useState([]);
  const [districtsPartida, setDistrictsPartida] = useState([]);
  const [departmentsLlegada, setDepartmentsLlegada] = useState([]);
  const [provincesLlegada, setProvincesLlegada] = useState([]);
  const [districtsLlegada, setDistrictsLlegada] = useState([]);

  // Función para cargar el Ubigeo de partida según la selección del usuario
  useEffect(() => {
    const selectedDataPartida = data.find(item => 
      item.departamento === selectedDepartmentPartida &&
      item.provincia === selectedProvincePartida &&
      item.distrito === selectedDistrictPartida
    );
  
    let ubigeoPartida = '';
    if (selectedDataPartida && selectedDataPartida.ubigeo_url) {
      const regex = /(\d{6})/; // Expresión regular para extraer el código de 6 dígitos
      const match = selectedDataPartida.ubigeo_url.match(regex);
      if (match) {
        ubigeoPartida = match[1]; // Obtener el primer grupo coincidente
      }
    }  
    setUbigeoPartida(ubigeoPartida);
    setEnvioDatos("puntoPartidaUbigeo", ubigeoPartida)
  }, [selectedDepartmentPartida, selectedProvincePartida, selectedDistrictPartida]);
  

  // Función para cargar el Ubigeo de llegada según la selección del usuario
  useEffect(() => {
    const selectedDataLlegada = data.find(item => 
      item.departamento === selectedDepartmentLlegada &&
      item.provincia === selectedProvinceLlegada &&
      item.distrito === selectedDistrictLlegada
    );
  
    let ubigeoLlegada = '';
    if (selectedDataLlegada && selectedDataLlegada.ubigeo_url) {
      const regex = /(\d{6})/; // Expresión regular para extraer el código de 6 dígitos
      const match = selectedDataLlegada.ubigeo_url.match(regex);
      if (match) {
        ubigeoLlegada = match[1]; // Obtener el primer grupo coincidente
        setEnvioDatos("puntoLlegadaUbigeo", ubigeoLlegada)
      }
    }
  
    console.log('ubigeoLlegada', ubigeoLlegada);
  
    setUbigeoLlegada(ubigeoLlegada);
  }, [selectedDepartmentLlegada, selectedProvinceLlegada, selectedDistrictLlegada]);
  

  // Funciones para manejar los cambios en los selectores de departamento, provincia y distrito de partida
  const handleDepartmentChangePartida = (event) => {
    setSelectedDepartmentPartida(event.target.value);
    setSelectedProvincePartida('');
    setSelectedDistrictPartida('');
  };

  const handleProvinceChangePartida = (event) => {
    setSelectedProvincePartida(event.target.value);
    setSelectedDistrictPartida('');
  };

  const handleDistrictChangePartida = (event) => {
    setSelectedDistrictPartida(event.target.value);
  };

  // Funciones para manejar los cambios en los selectores de departamento, provincia y distrito de llegada
  const handleDepartmentChangeLlegada = (event) => {
    setSelectedDepartmentLlegada(event.target.value);
    setSelectedProvinceLlegada('');
    setSelectedDistrictLlegada('');
  };

  const handleProvinceChangeLlegada = (event) => {
    setSelectedProvinceLlegada(event.target.value);
    setSelectedDistrictLlegada('');
  };

  const handleDistrictChangeLlegada = (event) => {
    setSelectedDistrictLlegada(event.target.value);
  };

  // Cargar la lista de departamentos de partida
  useEffect(() => {
    const departmentListPartida = [...new Set(data.map(item => item.departamento))];
    setDepartmentsPartida(departmentListPartida);
  }, []);

  // Cargar la lista de provincias de partida según el departamento seleccionado
  useEffect(() => {
    if (selectedDepartmentPartida !== '') {
      const provinceListPartida = [...new Set(data.filter(item => item.departamento === selectedDepartmentPartida).map(item => item.provincia))];
      setProvincesPartida(provinceListPartida);
    } else {
      setProvincesPartida([]);
    }
  }, [selectedDepartmentPartida]);

  // Cargar la lista de distritos de partida según la provincia seleccionada
  useEffect(() => {
    if (selectedProvincePartida !== '') {
      const districtListPartida = data.filter(item => item.departamento === selectedDepartmentPartida && item.provincia === selectedProvincePartida).map(item => item.distrito);
      setDistrictsPartida(districtListPartida);
    } else {
      setDistrictsPartida([]);
    }
  }, [selectedProvincePartida]);

  // Cargar la lista de departamentos de llegada
  useEffect(() => {
    const departmentListLlegada = [...new Set(data.map(item => item.departamento))];
    setDepartmentsLlegada(departmentListLlegada);
  }, []);

  // Cargar la lista de provincias de llegada según el departamento seleccionado
  useEffect(() => {
    if (selectedDepartmentLlegada !== '') {
      const provinceListLlegada = [...new Set(data.filter(item => item.departamento === selectedDepartmentLlegada).map(item => item.provincia))];
      setProvincesLlegada(provinceListLlegada);
    } else {
      setProvincesLlegada([]);
    }
  }, [selectedDepartmentLlegada]);

  // Cargar la lista de distritos de llegada según la provincia seleccionada
  useEffect(() => {
    if (selectedProvinceLlegada !== '') {
      const districtListLlegada = data.filter(item => item.departamento === selectedDepartmentLlegada && item.provincia === selectedProvinceLlegada).map(item => item.distrito);
      setDistrictsLlegada(districtListLlegada);
    } else {
      setDistrictsLlegada([]);
    }
  }, [selectedProvinceLlegada]);

  // Renderizar los componentes de selección de departamento, provincia y distrito para la partida
  const renderPartidaSelection = () => (
    <>
      <Col xs={3}>
        <Form.Label htmlFor="departamentoPartida" className="mb-2">
          Departamento
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleDepartmentChangePartida}
          value={selectedDepartmentPartida}
        >
          <option value="">Seleccione un departamento</option>
          {departmentsPartida.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="provinciaPartida" className="mb-2">
          Provincia
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleProvinceChangePartida}
          value={selectedProvincePartida}
        >
          <option value="">Seleccione una provincia</option>
          {provincesPartida.map((province, index) => (
            <option key={index} value={province}>{province}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="distritoPartida" className="mb-2">
          Distrito
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleDistrictChangePartida}
          value={selectedDistrictPartida}
        >
          <option value="">Seleccione un distrito</option>
          {districtsPartida.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="direccionPartidaUbigeo" className="mb-2">
          Ubigeo de Partida
        </Form.Label>
        <Form.Group controlId="direccionPartidaUbigeo">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Ingrese el Ubigeo de la dirección de partida"
            value={ubigeoPartida} // Usar un estado separado para el Ubigeo de partida
            onChange={e => setUbigeoPartida(e.target.value)} // Corregir el evento onChange para actualizar el estado del Ubigeo de partida
          />
        </Form.Group>
      </Col>
    </>
  );

  // Renderizar los componentes de selección de departamento, provincia y distrito para la llegada
  const renderLlegadaSelection = () => (
    <>
      <Col xs={3}>
        <Form.Label htmlFor="departamentoLlegada" className="mb-2">
          Departamento
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleDepartmentChangeLlegada}
          value={selectedDepartmentLlegada}
        >
          <option value="">Seleccione un departamento</option>
          {departmentsLlegada.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="provinciaLlegada" className="mb-2">
          Provincia
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleProvinceChangeLlegada}
          value={selectedProvinceLlegada}
        >
          <option value="">Seleccione una provincia</option>
          {provincesLlegada.map((province, index) => (
            <option key={index} value={province}>{province}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="distritoLlegada" className="mb-2">
          Distrito
        </Form.Label>
        <Form.Select
          size="sm"
          onChange={handleDistrictChangeLlegada}
          value={selectedDistrictLlegada}
        >
          <option value="">Seleccione un distrito</option>
          {districtsLlegada.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={3}>
        <Form.Label htmlFor="ubigeoLlegada" className="mb-2">
          Ubigeo Llegada
        </Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder="Ubigeo de llegada"
          value={ubigeoLlegada}
          readOnly
        />
      </Col>
    </>
  );

  useEffect(() => {
    setEnvioDatos("tipoDocumento", tipoDocumento);
  }, []);

  return (
    <div className="card mb-2">
      <div className="card-body pt-1 pb-0">
        <Form>
          <Row className="mt-3">
            <div>
              <h3 className="fw-bolder text-dark">DATOS DE ENVIO</h3>
            </div>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="modalidadTransporte" className="mb-2">
                Modalidad de Transporte
              </Form.Label>
              <Form.Select
                size="sm"
                onChange={(e) => setEnvioDatos("modalidadTransporte", e.target.value)}
              >
                <option value="">Seleccione una modalidad de transporte</option>
                <option value="01">Transporte público</option>
                <option value="02">Transporte privado</option>
              </Form.Select>
            </Col>

            <Col>
              <Form.Label htmlFor="motivoTraslado" className="mb-2">
                Motivo de Traslado
              </Form.Label>
              <Form.Select
                size="sm"
                onChange={(e) => setEnvioDatos("motivoTraslado", e.target.value)}
              >
                <option value="">Seleccione un motivo de traslado</option>
                <option value="01">Venta</option>
                <option value="02">Compra</option>
                <option value="03">Venta con entrega a terceros</option>
                <option value="04">Traslado entre establecimientos de la misma empresa</option>
                <option value="05">Consignación</option>
                <option value="06">Devolución</option>
                <option value="07">Recojo de bienes transformados</option>
                <option value="08">Importación</option>
                <option value="09">Exportación</option>
                <option value="13">Otros</option>
                <option value="14">Venta sujeta a confirmación del comprador</option>
                <option value="17">Traslado de bienes para transformación</option>
                <option value="18">Traslado emisor itinerante CP</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="pesoBrutoTotal" className="mb-2">
                Peso Bruto Total
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Ingrese el peso bruto total"
                onChange={(e) => setEnvioDatos("pesoBrutoTotal", e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label htmlFor="pesoUnidad" className="mb-2">
                Unidad de Peso
              </Form.Label>
              <Form.Select
                size="sm"
                onChange={(e) => setEnvioDatos("pesoUnidad", e.target.value)}
              >
                <option value="">Seleccione una unidad</option>
                <option value="KGM">Kilogramos</option>
                <option value="TNE">Toneladas</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label htmlFor="numeroBultos" className="mb-2">
                Número de Bultos
              </Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Ingrese el número de bultos"
                onChange={(e) => setEnvioDatos("numeroBultos", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="direccionPartida" className="mb-2">
                Dirección de Partida
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Ingrese la dirección de partida"
                onChange={(e) => setEnvioDatos("puntoPartida", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            {renderPartidaSelection()}
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="direccionLlegada" className="mb-2">
                Dirección de Llegada
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Ingrese la dirección de llegada"
                onChange={(e) => setEnvioDatos("puntoLlegada", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            {renderLlegadaSelection()}
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { DatosEnvio };

