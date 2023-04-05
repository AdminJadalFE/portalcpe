import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl' 
import {PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth' 
import {getDataResumen, getDataTotalEmision, getDataTotalEstados, getDataEstadoTipoCpe} from '../../modules/cpe/busqueda/services/CpeService'; 
import moment from 'moment'; 
import {CpeLoading} from '../../modules/loading/CpeLoading' 
import {toAbsoluteUrl} from '../../../_metronic/helpers'

import {  
  ChartsWidget6,
  ChartsWidget1,
  ChartsWidget2,
  CardsWidget20,
  CardsWidget17
} from '../../../_metronic/partials/widgets'
 
const DashboardWrapper = () => {
  const intl = useIntl()
  const {currentEmisor} = useAuth(); 
  const [tipoCpeData, setTipoCpeData] = useState();
  const [montoCpeData, setMontoCpeData] = useState();
  const [totalCpeData, setTotalCpeData] = useState();

  const [totalEmisionData, setTotalEmisionData] = useState();
  const [totalEstadosData, setTotalEstadosData] = useState();

  const [tiposCpe, setTiposCpe] = useState();
  const [totalesCpe, settotalesCpe] = useState();
  const [rechazadosCpe, setRechazadosCpe] = useState();
  const [pendientesCpe, setPendientesCpe] = useState(); 
  const [erroresCpe, setErroresCpe] = useState(); 

  const fechaDesde = moment().startOf('month').format('YYYY-MM-DD'); 
  const fechaHasta = moment().endOf('month').format('YYYY-MM-DD'); 

  // const fechaDesde = '2023-03-01'; 
  // const fechaHasta = '2023-03-31'; 
 

  const getDataList = async() => { 
    let dataResumen = await getDataResumen({rucEmisor: currentEmisor.rucEmisor, fechaDesde, fechaHasta}); 
    let dataTotalEmision = await getDataTotalEmision({rucEmisor: currentEmisor.rucEmisor, fechaDesde, fechaHasta}); 
    let dataTotalEstados = await getDataTotalEstados({rucEmisor: currentEmisor.rucEmisor, fechaDesde, fechaHasta}); 
    let dataEstadoTipoCpe = await getDataEstadoTipoCpe({rucEmisor: currentEmisor.rucEmisor, fechaDesde, fechaHasta}); 

    console.log(dataEstadoTipoCpe);

    const tipoCpe = []; 
    const montoCpe = []; 
    const totalCpe = [];  
      
      dataResumen.map((data) => {
        montoCpe.push(data.montoCpe.toFixed(2)); 
        totalCpe.push(data.totalCpe);
        switch (data._id) {
          case "01":
            tipoCpe.push("FACTURA");
            break;
          case "03":
            tipoCpe.push("BOLETA");
            break;
          case "07":
            tipoCpe.push("N. CRÉDITO");
            break;
          case "08":
            tipoCpe.push("N. DÉBITO");
            break;
          case "09":
            tipoCpe.push("GUÍA");
            break;
          case "20":
            tipoCpe.push("RETENCIÓN");
            break;
          case "40":
            tipoCpe.push("PERCEPCIÓN");
            break;
        }
      })  

  
    setTipoCpeData(tipoCpe)
    setMontoCpeData(montoCpe)
    setTotalCpeData(totalCpe)

    setTotalEmisionData(dataTotalEmision)
    setTotalEstadosData(dataTotalEstados)

    const tiposCpe = [] 
    const totalesCpe = dataEstadoTipoCpe.totalCpe; 
    const rechazadosCpe = dataEstadoTipoCpe.rechazadoCpe; 
    const pendientesCpe = dataEstadoTipoCpe.pendienteCpe; 
    const erroresCpe = dataEstadoTipoCpe.errorCpe; 
 
      dataEstadoTipoCpe.tipoCpe.map((data) => {  
        switch (data) {
          case "01":
            tiposCpe.push("FACTURA");
            break;
          case "03":
            tiposCpe.push("BOLETA");
            break;
          case "07":
            tiposCpe.push("N. CRÉDITO");
            break;
          case "08":
            tiposCpe.push("N. DÉBITO");
            break;
          case "09":
            tiposCpe.push("GUÍA");
            break;
          case "20":
            tiposCpe.push("RETENCIÓN");
            break;
          case "40":
            tiposCpe.push("PERCEPCIÓN");
            break;
        }
      })  
 
    setTiposCpe(tiposCpe)
    settotalesCpe(totalesCpe)
    setRechazadosCpe(rechazadosCpe)
    setPendientesCpe(pendientesCpe)
    setErroresCpe(erroresCpe)
  
  }

  useEffect(() => {
    getDataList();
  }, [currentEmisor.rucEmisor])
 
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
 
      {
          totalCpeData
          ? 
          ( 
            <> 

              <div className='row g-5 g-xl-8'>     
                <div className='col-xl-6'> 
                  <div className='row g-5 g-xl-8'>
                    <div className='col-xl-6'>
                    <CardsWidget20
                          className='card-xl-stretch mb-xl-10'
                          description='Comprobantes'
                          color='#F1416C'
                          img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                          cpe={totalEmisionData}
                        /> 
                    </div>
                    <div className='col-xl-6'>
                    <CardsWidget17 className='card-xl-stretch mb-xl-10' cpe={totalEstadosData} totalCpe={totalEmisionData.totalCpe}/> 
                    </div>
                  </div>  
 
                </div> 

                <div className='col-xl-6'> 
                  <div className='row g-5 g-xl-8'>
                    <div className='col-xl-12'> 
                    <ChartsWidget6 
                            className='card-xl-stretch mb-xl-10'
                            chartColor='primary'
                            chartHeight='200px' 
                            tiposCpe={tiposCpe}
                            totalesCpe={totalesCpe}
                            rechazadosCpe={rechazadosCpe}
                            pendientesCpe={pendientesCpe} 
                            erroresCpe={erroresCpe}
                            totalCpe={totalCpeData} /> 
                    </div> 
                  </div>   
                </div> 
              </div>   
              <div className='row g-5 g-xl-8'>
                <div className='col-xl-6'>
                  <ChartsWidget1 className='card-xl-stretch mb-xl-8' tipoCpe={tipoCpeData} totalCpe={totalCpeData} />
                </div>
                <div className='col-xl-6'>
                  <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' tipoCpe={tipoCpeData} montoCpe={montoCpeData}/>
                </div>
              </div>  
            </>
          )
          :
          (
            <CpeLoading />
          )
      } 


    </>
  )
}

export {DashboardWrapper}
