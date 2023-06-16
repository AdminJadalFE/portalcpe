
import { useState,useEffect } from 'react'
 
import {getSerie} from '../services/EmisionService';  
import {useAuth} from '../../auth'

const DatosEmisor = ({tipoCpe}) => {

  const {currentEmisor} = useAuth(); 

  console.log(currentEmisor);
  
  const [ dataSerie, setDataSerie ] = useState();
  
  const getSerieEmisor = async () => { 
    const serie = await getSerie({rucEmisor:currentEmisor.rucEmisor});
    setDataSerie(serie);
    console.log(serie);
  };

  useEffect(() => {   
    getSerieEmisor()
  }, [])  
  
  return (
 

        <div className='card mb-2'>
        <div className='card-body pt-1 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-1'> 
  
              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap'>
  
                <div className='d-flex flex-column'> 
                    <div className='d-flex my-8'>
                        <div className='pb-8'>
                          <h2 className='fw-bolder text-dark'>{currentEmisor.razonSocial}</h2>
                          <h2 className='fw-bolder text-dark'>{currentEmisor.rucEmisor}</h2>
                        </div>
                    </div> 
                  </div> 
    
                  <div className='d-flex flex-column'> 
                    <div className='d-flex my-4'>  
                      <div className='notice d-flex bg-light rounded border-light border border-dashed p-2' style={{ width: '500px' }} > 
                          <div className='d-flex flex-stack flex-grow-1 justify-content-center'>
                            <div className='fw-bold d-flex flex-column'> 
                              <div className='fs-4 text-gray-800 d-flex justify-content-center'>RUC: {currentEmisor.rucEmisor}</div>
                              <div className='d-flex justify-content-center'><h4 className='fs-1 pt-2 text-gray-800 fw-bolder'>{tipoCpe} ELECTRÓNICA</h4></div> 

                              {
                                !dataSerie ?
                                (

                                  <span className='text-muted mt-1 fw-semibold fs-7'></span>

                                )
                                :
                                (
                      
                                  <div className='fs-4 text-gray-800 d-flex justify-content-center'> {dataSerie.serie} - NNNNNNNN</div>

                                )

                              }

                              
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

export {DatosEmisor}
