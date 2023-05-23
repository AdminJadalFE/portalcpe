/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'  
import {KTSVG} from '../../../../../_metronic/helpers'  
import {Link} from 'react-router-dom' 
  
const UserActionsCell = ({cpe}) => {
 
        const [modalShow, setModalShow] = useState(false);
 
      
        return (
            <>  
   
                <Link to=''   
                        className='btn btn-light btn-active-light-primary btn-sm'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'>
                        Opciones
                        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
                </Link> 
                    {/* begin::Menu */}
                    <div
                        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-150px py-4'
                        data-kt-menu='true'
                    >
                    {/* begin::Menu item */}
                    <div className='menu-item px-3'>  
                    <a className='menu-link px-3' href={cpe.urlReporte} target="_blank" title='Descargar'>
                            <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-3' />
                            <text>&nbsp;  Descargar</text>
                    </a> 
            
                    </div>
                    {/* end::Menu item */} 
                </div>
                {/* end::Menu */}

   

            </>
        )
}

export {UserActionsCell}
 