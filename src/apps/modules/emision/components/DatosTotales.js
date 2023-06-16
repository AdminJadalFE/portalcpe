
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 


import {useEmision} from '../core/EmisionContext';
import { useEffect } from "react";

const DatosTotales = () => {
 
  const { setTotales,datosTotales, datosItem } = useEmision(); 

  console.log(datosTotales);
      
  useEffect(() => {
    setTotales() 
  }, [])


  useEffect(() => {
    setTotales() 
  }, [datosItem])

  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'> 


       <Form> 
               <Row className="mt-3"> 
                  <div>
                      <h3 className='fw-bolder text-dark'>TOTALES DEL COMPROBANTE</h3>
                  </div>
                </Row> 
                <div className='fs-4 text-gray-800 d-flex justify-content-end'>
                <Row className="mb-3"> 
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formSubTotal"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        SubTotal
                      </label>
                      <Form.Control size="sm" type="text" disabled value={datosTotales.subTotal} />
                    </Form.Group>
                  </Col>  
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formIgv"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        SubTotal Gravadas
                      </label>
                      <Form.Control size="sm" type="text" disabled value={datosTotales.subTotalGravadas} />
                    </Form.Group>
                  </Col>  
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formSubTotalGravadas"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        Total IGV
                      </label>
                      <Form.Control size="sm" type="text" disabled value={datosTotales.igv} />
                    </Form.Group>
                  </Col>  
                  <Col xs="auto">
                    <Form.Group as={Col} controlId="formTotal"> 
                      <label className='d-flex align-items-center form-label mb-3'>
                        Total
                      </label>
                      <Form.Control size="sm" type="text" disabled value={datosTotales.total} />
                    </Form.Group>
                  </Col> 
                </Row> 
                </div> 
            </Form> 

         

   
      </div>
    </div>
  )
}

export {DatosTotales}
