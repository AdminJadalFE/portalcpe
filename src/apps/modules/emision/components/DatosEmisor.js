
import { useState,useEffect } from 'react'
 
import {getSerie} from '../services/EmisionService';  
import {useAuth} from '../../auth'

const DatosEmisor = ({tipoCpe}) => {

  const {currentEmisor} = useAuth(); 
  const razonSocialEmisor = currentEmisor?.razonSocial || currentEmisor?.razonSocialEmisor || '';
  
  const [ dataSerie, setDataSerie ] = useState();
  
  const getSerieEmisor = async () => { 
    const serie = await getSerie({rucEmisor:currentEmisor.rucEmisor});
    setDataSerie(serie); 
  };

  useEffect(() => {   
    getSerieEmisor()
  }, [])  
  
  return (
 

        <div className='card mb-2 portal-emisor-card'>
        <div className='card-body pt-1 pb-0'>
          <div className='portal-emisor-section-title'>DATOS DEL EMISOR</div>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-1 portal-emisor-layout'>
            <div className='flex-grow-1 portal-emisor-company'>
              <div className='portal-emisor-identity'>
                {razonSocialEmisor && (
                  <h2 className='fw-bolder text-dark'>{razonSocialEmisor}</h2>
                )}
                <div className='portal-emisor-ruc'>RUC: {currentEmisor.rucEmisor}</div>
              </div>
            </div>

            <div className='d-flex flex-column portal-emisor-document'>
              <div className='d-flex my-4'>
                <div className='notice d-flex bg-light rounded border-light border border-dashed p-2'>
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
                      
                                  <div className='fs-4 text-gray-800 d-flex justify-content-center'>{dataSerie.serie} - NNNNNNNN</div>

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
 
  )
}

export {DatosEmisor}
