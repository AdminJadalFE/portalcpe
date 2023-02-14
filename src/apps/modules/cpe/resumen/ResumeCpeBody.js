import {useEffect, useState} from 'react' 
import {Link} from 'react-router-dom' 
import {useSearch} from '../busqueda/core/searchContext';  

const ResumeCpeBody = ({tipocpe, data}) => { 
    const { filterCpe, setDataFilterCpe } = useSearch();  
    const [tipoCpeData, setTipoCpeData] = useState([]); 
    let objtipoCpe = new Object();
    var resumenCpe = new Array();
 
    const getDataList = async() => {   
  
      tipocpe.map((tipo) => {  

        objtipoCpe = new Object();
        objtipoCpe.tipocpeCod = tipo.tipocpeCod;
        objtipoCpe.tipocpeDesc = tipo.tipocpeDesc;  
        objtipoCpe.aceptados = 0;
        objtipoCpe.rechazados = 0;
        objtipoCpe.baja = 0;
        objtipoCpe.pendiente = 0; 
        objtipoCpe.total = 0; 

        for (let i = 0; i < data.tipoCpe.length; i++) {  
          if (tipo.tipocpeCod === data.tipoCpe[i]) {
            objtipoCpe.aceptados = data.aceptadoCpe[i];
            objtipoCpe.rechazados = data.rechazadoCpe[i];
            objtipoCpe.baja = data.bajaCpe[i];
            objtipoCpe.pendiente = data.pendienteCpe[i]; 
            objtipoCpe.total = data.totalCpe[i]; 
          } 
        } 
        resumenCpe.push(objtipoCpe);
      })
      setTipoCpeData(resumenCpe);
    }

    const setFilterCpe = async (tipoCpe, estadoCpe) => {       
      let datos = {tipoCpe, estadoCpe} 
      setDataFilterCpe(datos);  
    }
    

     
    useEffect(() => {   
      getDataList();  
    }, [data])  

    return (
        <div className='card mb-5 mb-xl-8'>

        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Tipo de Comprobante</th>
                  <th className='min-w-140px'>Aceptados</th>
                  <th className='min-w-140px'>Rechazados</th>
                  <th className='min-w-120px'>Baja</th>
                  <th className='min-w-120px'>Pendiente</th> 
                  <th className='min-w-120px'>Total</th> 
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>

                {
                        tipoCpeData.map((tipoCpe) => (
                            <tr key={tipoCpe.tipocpeCod}>
                            <td>
                              <div className='d-flex align-items-center'> 
                                <div className='d-flex justify-content-start flex-column'>
                                  <span className='text-dark fw-bold text-hover-primary fs-6'>
                                   {tipoCpe.tipocpeCod} -  {tipoCpe.tipocpeDesc} 
                                  </span> 
                                </div>
                              </div>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'> 
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link to='/cpe/busqueda' onClick={() => setFilterCpe(tipoCpe.tipocpeCod, 'ACEPTADO')} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        {tipoCpe.aceptados} 
                                    </Link> 
                                  </div>
                                </div> 
                            </td>
                            <td>
                                <div className='d-flex align-items-center'> 
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link to='/cpe/busqueda' onClick={() => setFilterCpe(tipoCpe.tipocpeCod, 'RECHAZADO')} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        {tipoCpe.rechazados} 
                                    </Link>  
                                  </div>
                                </div> 
                            </td>
                            <td>
                                <div className='d-flex align-items-center'> 
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link to='/cpe/busqueda' onClick={() => setFilterCpe(tipoCpe.tipocpeCod, 'BAJA')} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        {tipoCpe.baja} 
                                    </Link> 
                                  </div>
                                </div> 
                            </td>
                            <td>
                                <div className='d-flex align-items-center'> 
                                  <div className='d-flex justify-content-start flex-column'>
                                    <Link to='/cpe/busqueda' onClick={() => setFilterCpe(tipoCpe.tipocpeCod, 'PENDIENTE')} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        {tipoCpe.pendiente} 
                                    </Link>  
                                  </div>
                                </div> 
                            </td>
                            <td>
                                <div className='d-flex align-items-center'> 
                                  <div className='d-flex justify-content-start flex-column'> 
                                    <Link to='/cpe/busqueda' onClick={() => setFilterCpe(tipoCpe.tipocpeCod, '-')} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        {tipoCpe.total} 
                                    </Link> 
                                  </div>
                                </div> 
                            </td>
                          </tr>


                        ))
                }
 
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    )
}
  
export {ResumeCpeBody}
