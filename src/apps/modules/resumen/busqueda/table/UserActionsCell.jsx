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
        >
            <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
        </a>
        <a
            href={cpe.urlPdf}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </a>
        <a 
            href={cpe.urlCdr} 
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
         >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a> 
    </>
  )
}

export {UserActionsCell}
