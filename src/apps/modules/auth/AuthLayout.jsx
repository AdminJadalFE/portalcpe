/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100 portal-auth-layout'>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 portal-auth-body'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10 portal-auth-form-wrapper'>
            <Outlet />
          </div>
          <div className='portal-auth-description portal-auth-description-bottom text-center'>
            Para mayor información de nuestro servicios puede consultar en{' '}
            <a href='https://es-la.facebook.com/JadalSoftwareSAC' target='_blank' rel='noreferrer'>
              www.jadalsystem.pe
            </a>
            <br /><br />
            También puede consultar nuestro Portal de{' '}
            <a href='https://www.visor.jadal.pe' target='_blank' rel='noreferrer'>
              Consulta Pública de Comprobantes
            </a>
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
 
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 portal-auth-aside'
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-end py-5 px-1 px-md-5 w-100'>
        <div className='d-flex flex-column flex-center py-5 px-1 px-md-5 w-100'>
          <div className='portal-auth-intro'>
            {/* begin::Title */}
            <h1 className='text-white fs-1qx fw-bolder text-center mb-7 pt-10'>
              Portal de Facturación Electrónica Jadal System
            </h1>
            {/* end::Title */}

            <img
              src={toAbsoluteUrl('/media/logos/logo2.png')}
              alt='Jadal Global Services'
              className='portal-auth-logo'
            />
          </div>
          <div className='portal-auth-aside-description text-center'>
            <p>
              Para mayor información de nuestro servicios puede consultar en{' '}
              <a href='https://es-la.facebook.com/JadalSoftwareSAC' target='_blank' rel='noreferrer'>
                www.jadalsystem.pe
              </a>
            </p>
            <p>
              También puede consultar nuestro Portal de{' '}
              <a href='https://www.visor.jadal.pe' target='_blank' rel='noreferrer'>
                Consulta Pública de Comprobantes
              </a>
            </p>
          </div>
          </div>
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
