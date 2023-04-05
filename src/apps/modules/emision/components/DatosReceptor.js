import {Link} from 'react-router-dom'
import * as XLSX from 'xlsx'; 
import moment from 'moment';  


import { KTSVG} from '../../../../_metronic/helpers' 

const DatosReceptor = () => {
  
  return (
    <div className='card mb-2'>
      <div className='card-body pt-1 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-1'> 

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap'>
              <div className='d-flex flex-column'>

                <div className='d-flex my-8'>
                    <div className='pb-8'>
                      <h2 className='fw-bolder text-dark'>RAZON SOCIAL DE LA EMPRESA</h2>
                      <h2 className='fw-bolder text-dark'>RUC</h2>
                    </div>
                </div>


              </div>

              <div className='d-flex flex-column'>
              
                <div className='d-flex my-4'>  
                  <div className='notice d-flex bg-light rounded border-light border border-dashed p-2' style={{ width: '500px' }} >
                
                      <div className='d-flex flex-stack flex-grow-1 justify-content-center'>
                        <div className='fw-bold d-flex flex-column'>
                            
                          <div className='fs-4 text-gray-800 d-flex justify-content-center'>RUC: 20543754332</div>
                          <div className='d-flex justify-content-center'><h4 className='fs-1 pt-2 text-gray-800 fw-bolder'>FACTURA ELECTRÓNICA</h4></div> 
                          <div className='fs-4 text-gray-800 d-flex justify-content-center'>Nro. de Factura</div>  
  
                        </div>
                      </div>
                    </div> 
                </div>

              </div>
 

            </div> 
          </div>

        </div>
      </div>
    </div>
  )
}

export {DatosReceptor}
