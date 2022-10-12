/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
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
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
 
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/logos/jadal.png')})`}}
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-end py-15 px-5 px-md-15 w-100'>
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          {/* begin::Title */}
          <h1 className='text-white fs-2qx fw-bolder text-center mb-7 pt-30'>
            Portal de Facturación Electrónica Jadal System
          </h1>
          {/* end::Title */}
          
          {/* begin::Text */}
          <div className='text-white fs-base text-center'>
            Para mayor información de nuestro servicios puede consultar en{' '}
            <a href='https://es-la.facebook.com/JadalSoftwareSAC' className='opacity-75-hover text-warning fw-bold me-1'>
              www.jadalsystem.pe
            </a>
            <br /><br />
            También puede consultar nuestro Portal de {' '}
            <a href='https://www.test.jadalfe.pe/visorcpe' className='opacity-75-hover text-warning fw-bold me-1'>
              Consulta Pública de Comprobantes
            </a> 
          </div>
          {/* end::Text */}
          </div>
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
