import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../apps/modules/auth' 
import {toAbsoluteUrl} from '../../../helpers' 

import './HeaderUserMenu.css'

const HeaderUserMenu = () => {
  const {currentUser, setCurrentEmisor, emisores, logout} = useAuth(); 

  const setEmisorDefault = (emi) => {
    setCurrentEmisor(emi);  
  } 
 
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.nombre}
              
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
   
      <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom' 
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>Mis Empresas</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>{emisores.length}</span>
          </span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-400px py-4 contenedorEmpresas'> 

          {
            emisores.map((emi,i) => ( 
              <div key={i} className='menu-item px-3'> 
                <Link to='.' onClick={() => setEmisorDefault(emi)} className='menu-link px-5'>
                  {emi.razonSocial}
                </Link>
              </div> 
            ))
          } 
  
        </div>
      </div>
  
      <div className='separator my-2'></div>
   
      {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Cerrar Sesión
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
 