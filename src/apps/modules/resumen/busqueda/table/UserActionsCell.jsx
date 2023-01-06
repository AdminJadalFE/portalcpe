/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react' 
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import { KTSVG} from '../../../../../_metronic/helpers' 
 
const UserActionsCell = ({cpe}) => {
 
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  
  return (
    <> 
        <a
            href={cpe.urlCpe}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            title='Descargar XML'
        >
            <KTSVG path='/media/icons/duotune/fe/xml.svg' className='svg-icon-3' />
        </a>
        <a
            href={cpe.urlPdf}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            title='Descargar PDF'
        >
            <KTSVG path='/media/icons/duotune/fe/pdf.svg' className='svg-icon-3' />
        </a>
        <a 
            href={cpe.urlCdr} 
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
            title='Descargar CDR'
         >
            <KTSVG path='/media/icons/duotune/fe/cdr.svg' className='svg-icon-3' />
        </a> 
    </>
  )
}

export {UserActionsCell}
