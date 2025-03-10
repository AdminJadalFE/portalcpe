/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from 'react'
import {useIntl} from 'react-intl' 
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from '../../../../../apps/modules/auth'
import {getSerie} from '../../../../../apps/modules/emision/services/EmisionService'
import {useState} from 'react'

const SidebarMenuMain = () => {
  const intl = useIntl() 
  const {currentEmisor} = useAuth(); 
  const [containSerie, setContainSerie] = useState(false);
  useEffect(() => {
    (async () => {
      const serie = await getSerie({rucEmisor:currentEmisor.rucEmisor});
      setContainSerie(!!serie)
    })()
  }, [])

  const data = JSON.parse(localStorage.getItem("data"));
  const email = data.email;
  
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
    {containSerie &&
      <SidebarMenuItemWithSub
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
          <SidebarMenuItem
            to='/emision/boleta'
            title='Boleta'
            hasBullet={true}
          /> 
          <SidebarMenuItem
            to='/emision/notacredito'
            title='Nota de Crédito'
            hasBullet={true}
          /> 
          <SidebarMenuItem
            to='/emision/guia'
            title='Guia de Remisión-Remitente'
            hasBullet={true}
          />             
          <SidebarMenuItem
            to='/emision/serie'
            title='Serie-Número'
            hasBullet={true}
          />         
      </SidebarMenuItemWithSub>
      }
     
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

      {email === "adm@jadalfe.pe" && (
      <SidebarMenuItemWithSub
          to='/emisión'
          title='Empresas y Usuarios'
          fontIcon='bi-archive'
          icon='/media/icons/duotune/general/com014.svg'
        > 
            <SidebarMenuItem
            to='/empresa/registrar'
            title='Empresas'
            hasBullet={true}
            fontIcon='bi-archive'
            icon='/media/icons/duotune/general/ecm008.svg'
          /> 
          <SidebarMenuItem
            to='/empresa/usuario/registrar'
            title='Usuarios'
            hasBullet={true}
            fontIcon='bi-archive'
            icon='/media/icons/duotune/general/com013.svg'
          /> 
      </SidebarMenuItemWithSub>
      )}

    </>
  )
}

export {SidebarMenuMain}
