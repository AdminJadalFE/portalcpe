import React, {useState, useEffect, useContext} from 'react';  
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import moment from 'moment'; 
 
import {useEmision} from '../core/EmisionContext';
import {getMoneda, getTipoAfectacion, getFormaPago} from '../services/EmisionService';  

const DatosEmision = ({tipoCpe}) => {

  console.log(tipoCpe);
 
  const { setCpeDatosInicial, setCpeDatos, datosItem  } = useEmision();
  const [ monedas, setMonedas ] = useState([]);
  const [ tiposAfectacion, setTiposAfectacion ] = useState([]);
  const [ formasPago, setFormasPago ] = useState([]);
  const [ icbperChecked, setIcbperChecked ] = useState(true);
 
  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;
 
    if (
      (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) ||
      (charCode === 46 && inputValue.includes('.'))
    ) {
      event.preventDefault();
    }
  };
  
  const setFechaCpe = (event) => { 
    setCpeDatos('fechaCpe', event.target.value) 
  };

  const setFechaVencimiento = (event) => { 
    setCpeDatos('fechaVencimiento', event.target.value) 
  };

  const setMoneda= (event) => { 
    setCpeDatos('moneda', event.target.value) 
  };

  const setFormaPago= (event) => { 
    setCpeDatos('formaPago', event.target.value) 
  };

  const setTipoAfectacion= (event) => { 
    setCpeDatos('tipoAfectacion', event.target.value) 
  };

  const setAfectacionIgv= (event) => { 
    setCpeDatos('afectacionIgv', event.target.checked) 
  };

  const setPorcentajeIgv= (event) => { 
    setCpeDatos('porcentajeIgv', parseFloat(event.target.value).toFixed(2)) 
  };

  const setDisableAfectacion= () => { 
    if (datosItem.length > 0) {
      setIcbperChecked(true);
    }else{
      setIcbperChecked(false);
    }
  };

  const getData = async () => { 
    const listMoneda = await getMoneda();
    setMonedas(listMoneda);
    const listTipoAfectacion = await getTipoAfectacion();
    setTiposAfectacion(listTipoAfectacion);
    const listFormasPago = await getFormaPago();
    setFormasPago(listFormasPago);
  }; 

  const setData = async () => {  
      setCpeDatosInicial(tipoCpe, '01'); 
  }; 

  useEffect(() => {    
    getData();
    setData();
  }, [])  
  
  useEffect(() => {
    setDisableAfectacion() 
  }, [datosItem])
  
  return (
    
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 
         
            <Form>

              <Row className="mt-3"> 
                <div>
                    <h3 className='fw-bolder text-dark'>DATOS DE EMISIÓN</h3>
                </div>
              </Row>

              <Row className="mb-3">
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaCpe"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        Fecha Emisión
                      </label>
                      <Form.Control size="sm"  type="date" defaultValue={fechaActual} onChange={setFechaCpe}/>
                  </Form.Group>  
                </Col> 
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formFechaVencimiento"> 
                    <label className='d-flex align-items-center form-label mb-3'>
                      Fecha Vencimiento
                    </label>  
                    <Form.Control size="sm"  type="date" defaultValue={fechaActual} onChange={setFechaVencimiento}/> 
                  </Form.Group>
                </Col>  
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formGridEmail">
                  <label className='d-flex align-items-center form-label mb-3'>
                      Moneda
                    </label>
                    <Form.Select  size="sm"  defaultValue="PEN" onChange={setMoneda}>
                    {
                        monedas.map((uni,i) => (
                          <option key={i} value={uni.codigoMoneda}>{uni.descripcionMoneda}</option>
                        ))
                    }
                    </Form.Select>
                  </Form.Group>
                </Col> 
                <Col xs="auto">
                  <Form.Group as={Col} controlId="formGridEmail">
                  <label className='d-flex align-items-center form-label mb-3'>
                      Tipo Afectacion
                    </label>
                    <Form.Select  size="sm"  defaultValue="PEN" onChange={setTipoAfectacion}>
                    {
                        tiposAfectacion.map((uni,i) => (
                          <option key={i} value={uni.codigoTipoAfectacion}>{uni.descripcionTipoAfectacion}</option>
                        ))
                    }
                    </Form.Select>
                  </Form.Group>
                </Col> 

                {
                  tipoCpe == '01' ?
                  (
                    <Col xs="auto">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <label className='d-flex align-items-center form-label mb-3'>
                        Forma Pago
                      </label>
                      <Form.Select  size="sm"  defaultValue="PEN" onChange={setFormaPago}>
                      {
                          formasPago.map((uni,i) => (
                            <option key={i} value={uni.codigoFormaPago}>{uni.descripcionFormaPago}</option>
                          ))
                      }
                      </Form.Select>
                    </Form.Group>
                  </Col> 
                  ):
                  (<></>)
                } 

                <Col xs="auto"> 
                    <Form.Group as={Col} controlId="formAfectacion" > 
                      <label className='d-flex align-items-center form-label mb-3'>
                          Afectación IGV
                      </label>  
                      <div  className='d-flex align-items-center mt-5'>
                        <Form.Check type="switch" id="afectacion" defaultChecked={true} onChange={setAfectacionIgv} disabled={icbperChecked}/> 
                      </div>
 
                    </Form.Group>
                </Col> 
                
                <Col xs="auto"> 
                    <Form.Group as={Col} controlId="formAfectacion" > 
                      <label className='d-flex align-items-center form-label mb-3'>
                          Porcentaje IGV
                      </label>   
                      <Form.Control size="sm" pattern="[0-9]*\.?[0-9]*" onKeyPress={handleKeyPress} type="decimal" defaultValue="18.00" onChange={setPorcentajeIgv} /> 
 
                    </Form.Group>
                </Col> 
                

              </Row> 
            </Form>  
 
      </div>
    </div>
  )
}

export {DatosEmision}
