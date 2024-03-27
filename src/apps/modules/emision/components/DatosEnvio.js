import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useEmision } from "../core/EmisionContext";
import data from '../../data/ubigetoData';

const DatosEnvio = ({ tipoDocumento }) => {
  console.log('datatttta',data);
  const { setEnvioDatos } = useEmision();
  const [ubigeo, setUbigeo] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);


  useEffect(() => {
    // Buscar el Ubigeo correspondiente
    const selectedData = data.find(item => 
      item.departamento === selectedDepartment &&
      item.provincia === selectedProvince &&
      item.distrito === selectedDistrict
    );

    if (selectedData) {
      setUbigeo(selectedData.ubigeo_url);
      setDireccionPartidaUbigeo(selectedData.ubigeo_url);
    } else {
      setUbigeo('');
      setDireccionPartidaUbigeo('');
    }
  }, [selectedDepartment, selectedProvince, selectedDistrict]);


  const [selectedUnit, setSelectedUnit] = useState('');

  const setMotivoTraslado = (event) => {
    setEnvioDatos("motivoTraslado", event.target.value);
  };
  const setPesoBrutoTotal = (event) => {
    setEnvioDatos("pesoBrutoTotal", event.target.value);
  };
  const setDireccionPartida = (event) => {
    setEnvioDatos("puntoPartida", event.target.value);
  };
  const setDireccionPartidaUbigeo = (ubigeo) => {
    if (ubigeo) {
      console.log('biefawefa',ubigeo);
      setEnvioDatos("puntoPartidaUbigeo", ubigeo);
    }
  };  
  const setModalidadTransporte = (event) => {
    setEnvioDatos("modalidadTransporte", event.target.value);
  };
  const setNumeroBultos = (event) => {
    setEnvioDatos("numeroBultos", event.target.value);
  };
  const setDireccionLlegada = (event) => {
    setEnvioDatos("puntoLlegada", event.target.value);
  };
  const setDireccionLlegadaUbigeo = (event) => {
    setEnvioDatos("puntoLlegadaUbigeo", event.target.value);
  };
  const setPesoUnidad = (event) => {
    setEnvioDatos("pesoUnidad", event.target.value);
  };


  //ubigeo
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedProvince('');
    setSelectedDistrict('');
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  useEffect(() => {
    // Obtener la lista de departamentos
    const departmentList = [...new Set(data.map(item => item.departamento))];
    setDepartments(departmentList);
  }, []);

  useEffect(() => {
    // Filtrar las provincias según el departamento seleccionado
    if (selectedDepartment !== '') {
      const provinceList = [...new Set(data.filter(item => item.departamento === selectedDepartment).map(item => item.provincia))];
      setProvinces(provinceList);
    } else {
      setProvinces([]);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    // Filtrar los distritos según la provincia seleccionada
    if (selectedProvince !== '') {
      const districtList = data.filter(item => item.departamento === selectedDepartment && item.provincia === selectedProvince).map(item => item.distrito);
      setDistricts(districtList);
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    const selectedData = data.find(item => 
      item.departamento === selectedDepartment &&
      item.provincia === selectedProvince &&
      item.distrito === selectedDistrict
    );
  
    if (selectedData) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedData.ubigeo_url, 'text/html');
      const codigoUbicacion = doc.querySelector('a')?.textContent.trim(); // Utilizar el operador opcional "?." para evitar errores si no se encuentra ningún elemento
      setUbigeo(codigoUbicacion);
      setDireccionPartidaUbigeo(codigoUbicacion);
      console.log('codigo ubieto',codigoUbicacion);
    } else {
      setUbigeo('');
      setDireccionPartidaUbigeo(''); // Restablecer el Ubigeo de la dirección de partida si no se encuentra ningún dato seleccionado
    }
  }, [selectedDepartment, selectedProvince, selectedDistrict]);  


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
            <Col xs={6}>
              <Form.Group as={Col} controlId="formModalidadTransporte">
                <Form.Select size="sm" onChange={setModalidadTransporte}>
                  <option value="">
                    Seleccione una modalidad de transporte
                  </option>
                  <option value="01">Transporte público</option>
                  <option value="02">Transporte privado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group as={Col} controlId="formMotivoTraslado">
                <Form.Select size="sm" onChange={setMotivoTraslado}>
                  <option value="">Seleccione un motivo de traslado</option>
                  <option value="01">Venta</option>
                  <option value="02">Compra</option>
                  <option value="03">Venta con entrega a terceros</option>
                  <option value="04">
                    Traslado entre establecimientos de la misma empresa
                  </option>
                  <option value="05">Consignación</option>
                  <option value="06">Devolución</option>
                  <option value="07">Recojo de bienes transformados</option>
                  <option value="08">Importación</option>
                  <option value="09">Exportación</option>
                  <option value="13">Otros</option>
                  <option value="14">
                    Venta sujeta a confirmación del comprador
                  </option>
                  <option value="17">
                    Traslado de bienes para transformación
                  </option>
                  <option value="18">Traslado emisor itinerante CP</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <Form.Label htmlFor="pesoBrutoTotal" className="mb-2">
                Peso Bruto Total
              </Form.Label>
              <Form.Group controlId="pesoBrutoTotal">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Ingrese el peso bruto total"
                  onChange={setPesoBrutoTotal}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Label htmlFor="unidadPeso" className="mb-2">
                Unidad de Peso
              </Form.Label>
              <Form.Select size="sm"  onChange={setPesoUnidad}>
                <option value="">Seleccione una unidad</option>
                <option value="KGM">Kilogramos</option>
                <option value="TNE">Toneladas</option>
              </Form.Select>
            </Col>
            <Col xs={4}>
              <Form.Label htmlFor="numeroBultos" className="mb-2">
                Número de Bultos
              </Form.Label>
              <Form.Group controlId="numeroBultos">
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Ingrese el número de bultos"
                  onChange={setNumeroBultos}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={9}>
              <Form.Label htmlFor="direccionPartida" className="mb-2">
                Dirección de Partida
              </Form.Label>
              <Form.Group controlId="direccionPartida">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Ingrese la dirección de partida"
                  onChange={setDireccionPartida}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
              <Col xs={3}>
              <Form.Label htmlFor="direccionPartida" className="mb-2">
                Departamento
              </Form.Label>
                <Form.Group controlId="formDepartment">
                  <Form.Select size="sm" onChange={handleDepartmentChange} value={selectedDepartment}>
                    <option value="">Seleccione un departamento</option>
                    {departments.map((department, index) => (
                      <option key={index} value={department}>{department}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
              <Form.Label htmlFor="direccionPartida" className="mb-2">
                Provincia
              </Form.Label>            
                <Form.Group controlId="formProvince">
                  <Form.Select size="sm" onChange={handleProvinceChange} value={selectedProvince}>
                    <option value="">Seleccione una provincia</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>{province}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={3}>
              <Form.Label htmlFor="direccionPartida" className="mb-2">
                Distrito
              </Form.Label>    
                <Form.Group controlId="formDistrict">
                  <Form.Select size="sm" onChange={handleDistrictChange} value={selectedDistrict}>
                    <option value="">Seleccione un distrito</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>            
              <Col xs={3}>
                <Form.Label htmlFor="direccionPartidaUbigeo" className="mb-2">
                  Ubigeo
                </Form.Label>
                <Form.Group controlId="direccionPartidaUbigeo">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Ingrese el Ubigeo de la dirección de partida"
                    value={ubigeo} // Establecer el valor del Ubigeo directamente desde el estado
                    onChange={setDireccionPartidaUbigeo} // Aunque este evento no se utiliza, se debe mantener para evitar errores
                  />
                </Form.Group>
              </Col>
          </Row>


          <Row className="mb-3">
            <Col xs={9}>
              <Form.Label htmlFor="direccionLlegada" className="mb-2">
                Dirección de Llegada
              </Form.Label>
              <Form.Group controlId="direccionLlegada">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Ingrese la dirección de partida"
                  onChange={setDireccionLlegada}
                />
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Label htmlFor="direccionLlegadaUbigeo" className="mb-2">
                Ubigeo
              </Form.Label>
              <Form.Group controlId="direccionLlegadaUbigeo">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Ingrese el Ubigeo de la dirección de partida"
                  onChange={setDireccionLlegadaUbigeo}
                />
              </Form.Group>
            </Col>
          </Row>

        </Form>
      </div>
    </div>
  );
};

export { DatosEnvio };
