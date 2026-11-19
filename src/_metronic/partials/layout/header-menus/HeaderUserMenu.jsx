import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../apps/modules/auth' 
import {confirmLogout} from '../../../../apps/modules/auth/confirmLogout'

import './HeaderUserMenu.css'

const HeaderUserMenu = () => {
  const {currentUser, setCurrentEmisor, emisores, logout} = useAuth(); 
  const userName = currentUser?.nombre
    || currentUser?.nombreUsuario
    || currentUser?.email
    || currentUser?.emailUsuario
    || 'Usuario del portal'
  const userEmail = currentUser?.email || currentUser?.emailUsuario || 'Cuenta autenticada'

  const setEmisorDefault = (emi) => {
    setCurrentEmisor(emi);  
  } 
 
  return (
    <div
      className='menu portal-user-menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='portal-user-menu-avatar' aria-hidden='true'>
            <i className='bi bi-person-fill' />
          </div>

          <div className='portal-user-menu-identity'>
            <div className='portal-user-menu-name'>{userName}</div>
            <span className='portal-user-menu-email'>{userEmail}</span>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
   
      <div
        className='menu-item px-5'
        data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom' 
      >
        <button type='button' className='menu-link px-5' onClick={(event) => event.preventDefault()}>
          <span className='menu-title'>Mis Empresas</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>{emisores.length}</span>
          </span>
          <span className='menu-arrow'></span>
        </button>

        <div className='menu-sub menu-sub-dropdown w-400px py-4 contenedorEmpresas portal-companies-menu'>

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
        <button type='button' onClick={() => confirmLogout(logout)} className='menu-link px-5'>
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export {HeaderUserMenu}

