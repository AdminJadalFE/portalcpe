/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react' 
import {useLocation} from 'react-router-dom'

const ResumenHeaderOption = () => {
  const location = useLocation()

  return (
    <div className='card mb-2 mb-xl-10'>
      <div className='card-body pt-1 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-1'> 

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap'>
              <div className='d-flex flex-column'></div>

              <div className='d-flex my-4'> 
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Exportar CPE
                </a> 
              </div>
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  )
}

export {ResumenHeaderOption}
