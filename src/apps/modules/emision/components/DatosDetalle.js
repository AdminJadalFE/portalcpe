import { useForm } from "react-hook-form"; 

import { useState } from 'react'
 
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {useEmision} from '../core/EmisionContext';

import Swal from 'sweetalert2';

const DatosDetalle = () => {

  
let { register, handleSubmit } = useForm();   

const { AddItem,DeleteItem, datosItem } = useEmision();
const [ cantidad, setCantidad ] = useState();
const [ precio, setPrecio ] = useState();
const [ venta, setVenta ] = useState();

  const manejarSubmit = async (data) => {    
 
    if (!data || !data.codigo) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Código del Ítem",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!data || !data.descripcion) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Descripción del Ítem",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!data || !data.unidadMedida) { 
      Swal.fire({
        icon: "error",
        title: "Debe seleccionar la Unidad de Medida del Ítem",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }
    console.log(data.cantidad);
    if (!cantidad) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar la Cantidad del Ítem",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    if (!precio) { 
      Swal.fire({
        icon: "error",
        title: "Debe ingresar el Precio del Ítem",
        showConfirmButton: false,
        timer: 5000
      })      
      return false;
    }

    data.cantidad = cantidad;
    data.precio = precio;
    data.venta = venta;
    AddItem(data);
  }

  const ItemDelete = (item) => { 
    DeleteItem(item);
  };

  const calcularVentaCantidad = (event) => { 
    let value = event.target.value;
    setCantidad(value) 
    console.log(precio);
    const venta = value * (precio == undefined ? 0 : precio)
    setVenta(venta);
  };

  const calcularVentaPrecio = (event) => { 
    let value = event.target.value;
    setPrecio(value) 
    const venta = (cantidad == undefined ? 0 : cantidad) * value
    setVenta(venta);
  };

  
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 
 

            <form onSubmit={handleSubmit(manejarSubmit)}>   
                <Row className="mt-3"> 
                  <div>
                      <h3 className='fw-bolder text-dark'>ÍTEMS DEL COMPROBANTE</h3>
                  </div>
                </Row>

                <Row className="mb-3"> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formCodigo">  
                      <Form.Control size="sm"  type="text" placeholder="Código" {...register('codigo', { required: false })} />
                    </Form.Group>
                  </Col> 
 
                  <Col>
                    <Form.Group  controlId="formDescripcion" lg={2}> 
                      <Form.Control size="sm"  type="text" placeholder="Descripción" {...register('descripcion', { required: false })} />
                    </Form.Group>
                  </Col>  

                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formUnidadMedida">
                      <Form.Select size="sm"  {...register('unidadMedida', { required: false })}>
                        <option value="NIU">NIU</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> 
                </Row>


                <Row className="mb-3">  

                <Col xs="auto">
                    <Form.Group as={Col} controlId="formCantidad"> 
                      <Form.Control size="sm"  type="decimal" placeholder="Cantidad"  value={cantidad} onChange={calcularVentaCantidad} />
                    </Form.Group>
                  </Col> 

                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formPrecio"> 
                      <Form.Control size="sm"  type="decimal" placeholder="Precio Unitario" value={precio} onChange={calcularVentaPrecio} />
                    </Form.Group>
                  </Col> 

                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formVenta"> 
                      <Form.Control size="sm"  type="decimal" value={venta}  disabled/>
                    </Form.Group>
                  </Col> 

                  <Col xs="auto">
                    <button type="submit" className="btn btn-dark btn-sm w-150px ps-5">Agregar</button>
                  </Col> 
  
                </Row>
                </form> 


 
 
                  <div className='d-flex my-4'>  
                    <div className='d-flex bg-light rounded border-light border border-dashed pt-4'  style={{ width: '100%' }} > 
                        <div className='d-flex flex-stack flex-grow-1 justify-content-center mx-8'> 

                          <Table responsive striped bordered hover>
                                <thead >
                                    <tr> 
                                      <th style={{ width: '100px'}}><h6><strong>Ítem</strong></h6></th>
                                      <th style={{ width: '140px', border: 'none'}}><h6><strong>Acción</strong></h6></th>
                                      <th style={{ width: '100px'}}><h6><strong>Código</strong></h6></th> 
                                      <th style={{ width: '500px'}}><h6><strong>Descripción</strong></h6></th> 
                                      <th style={{ width: '100px'}}><h6><strong>U.M</strong></h6></th> 
                                      <th style={{ width: '100px'}}><h6><strong>Cantidad</strong></h6></th> 
                                      <th style={{ width: '100px'}}><h6><strong>Precio</strong></h6></th> 
                                      <th style={{ width: '100px'}}><h6><strong>Total</strong></h6></th> 
                                    </tr>
                                </thead>
                                <tbody>  

                                {
                                    datosItem.map((item,i) => (
                                        <tr key={i}> 
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{i+1}</td>
                                            <td style={{ width: '140px'}}><button type="submit" className="btn btn-dark btn-sm"onClick={() => ItemDelete(item.codigo)} >Eliminar</button></td>
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{item.codigo}</td>
                                            <td style={{ width: '500px', verticalAlign : 'middle'}}>{item.descripcion}</td>
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{item.unidadMedida}</td>
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{item.cantidad}</td>
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{item.precio}</td>
                                            <td style={{ width: '100px', verticalAlign : 'middle'}}>{item.venta}</td>
                                        </tr>  
                                          ))
                                    }
 
                                </tbody>
                            </Table>
 
                        </div> 
                      </div> 
                  </div>  


 
      </div>
    </div>
  )
}

export {DatosDetalle}
