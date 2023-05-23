/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl' 
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl() 
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
 
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Gestión</span>
        </div>
      </div>


      <SidebarMenuItem
          to='/cpe/emitidos'
          title='Emitidos'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
        />  
  
      {/* <SidebarMenuItemWithSub
        to='/emisión'
        title='Emisión Web'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      > 
          <SidebarMenuItem
            to='/emision/factura'
            title='Factura'
            hasBullet={true}
          /> 
      </SidebarMenuItemWithSub> */}
     
      <SidebarMenuItemWithSub
        to='/baja'
        title='Comunicación de Baja'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      > 
          <SidebarMenuItem
            to='/baja/busqueda'
            title='Búsqueda'
            hasBullet={true}
          /> 
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/resumen'
        title='Resumen de Comprobantes'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      > 
          <SidebarMenuItem
            to='/resumen/busqueda'
            title='Búsqueda'
            hasBullet={true}
          /> 
      </SidebarMenuItemWithSub>

     
        <SidebarMenuItem
          to='/reporte/busqueda'
          title='Reportes'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/gen022.svg'
        />  
  
  
    </>
  )
}

export {SidebarMenuMain}
