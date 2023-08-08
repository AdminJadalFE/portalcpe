import { 
    useState, 
    createContext,
    useContext, 
  } from 'react'

  import moment from 'moment'; 

  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");

  const cpeInitialize = {
    fechaCpe:fechaActual,
    fechaVencimiento:fechaActual,
    moneda: 'PEN',
    tipoAfectacion: '1000',
    formaPago: '01',
    afectacionIgv: true,
    porcentajeIgv: '18.00'
  }

  const contingenciaInitialize = {
    indContingencia: false,
    serieContingencia: '',
    correlativoContingencia: '',
    codigoAutorizacion: ''
  }

  const totalesInitialize = {
    subTotal:0,
    igv:0,
    subTotalGravadas:0,
    total:0
  }
 
  const referenciaInitialize = {
    fechaCpeRef:fechaActual,
    tipoNotaCredito:'01'
  }
 
  const adicionalesInitialize = {
    observaciones:'',
    libre1:'',
    valor1:'',
    libre2:'',
    valor2:'',
    libre3:'',
    valor3:''
  }

  const receptorInitialize = {
    direccion:'',
    correo:''
  }

  const EmisionContext = createContext()
 
  const useEmision = () => {
    return useContext(EmisionContext)
  }

  const EmisionProvider = ({children}) => {

    const [datosCpe, setDatosCpe] = useState(cpeInitialize);
    const [datosContingencia, setDatosContingencia] = useState(contingenciaInitialize);
    const [datosReceptor, setDatosReceptor] = useState(receptorInitialize);  
    const [datosReferencia, setDatosReferencia] = useState(referenciaInitialize);  
    const [datosItem, setDatosItem] = useState([]);
    const [datosDocRel, setDatosDocRel] = useState([]);
    const [datosFormaPago, setDatosFormaPago] = useState([]);
    const [datosTotales, setDatosTotales] = useState(totalesInitialize);
    const [datosAdicionales, setDatosAdicionales] = useState(adicionalesInitialize);

    const setCpeDatos =  async (campo, valor) => { 
      setDatosCpe({ ...datosCpe, [campo]: valor });  
    }

    const setContingenciaDatos =  async (campo, valor) => { 
      setDatosContingencia({ ...datosContingencia, [campo]: valor });  
    }

    const setReceptorDatos =  async (campo, valor) => { 
      setDatosReceptor({ ...datosReceptor, [campo]: valor });  
    }

    const setReferenciaDatos =  async (campo, valor) => { 
      setDatosReferencia({ ...datosReferencia, [campo]: valor });  
    }

    const setAdicionalesDatos =  async (campo, valor) => { 
      setDatosAdicionales({ ...datosAdicionales, [campo]: valor });  
    }
  
    const AddItem =  (item) => {  
        console.log(datosCpe);
        let porcIgv = parseFloat(((datosCpe.afectacionIgv ? datosCpe.porcentajeIgv : 0) / 100).toFixed(2));

        item.igv = (item.venta * porcIgv).toFixed(2);
        let igvunit = (item.precio * porcIgv).toFixed(2); 
 
        item.totalicbper = (parseFloat(item.cantidad) * parseFloat(item.icbper == undefined ? 0 : item.icbper)).toFixed(2);
        item.total = (parseFloat(item.precio) + parseFloat(igvunit) + parseFloat(item.icbper)).toFixed(2) ;
        
        item.totalimpuestos = (parseFloat(item.igv) + parseFloat(item.totalicbper)).toFixed(2);
        item.icbper = parseFloat(item.icbper).toFixed(2);
        item.venta = parseFloat(item.venta).toFixed(2);
        item.precio = parseFloat(item.precio).toFixed(2);
        setDatosItem([...datosItem, item]) 
    }

    const DeleteItem =  (codigo) => { 
      let datosItemTemp =  datosItem.filter(det => det.codigo !== codigo) 
      setDatosItem(datosItemTemp); 
    }
 
    const setTotales =  () => {  

      let porcIgv = parseFloat(((datosCpe.afectacionIgv ? datosCpe.porcentajeIgv : 0) / 100).toFixed(2));

      let subtotal = 0;
      let totalicbper = 0;
      datosItem.map((item) => { 
        subtotal += parseFloat(item.venta);
        totalicbper += parseFloat(item.totalicbper == undefined ? 0 : item.totalicbper );
      })

      let igv = (subtotal * porcIgv).toFixed(2);
      let totalimpuestos = (parseFloat(totalicbper) + parseFloat(igv)).toFixed(2);
      let total = (subtotal + parseFloat(igv) + totalicbper).toFixed(2);
  
      setDatosTotales({ ...datosTotales, 'subTotal': subtotal.toFixed(2),'igv': igv,'subTotalGravadas': subtotal.toFixed(2),'total': total, 'totalicbper': totalicbper.toFixed(2), 'totalimpuestos': totalimpuestos });  
  
    }

    const CleanItem =  () => { 
      setDatosItem([]);
    }
 
    const AddFormaPago =  (formaPago) => {  
      setDatosFormaPago([...datosFormaPago, formaPago]) 
    }
    const DeleteFormaPago =  (codigoFormaPago) => { 
    let datosFormaPagoTemp =  datosFormaPago.filter(formapago => formapago.codigocuota !== codigoFormaPago)  
    setDatosFormaPago(datosFormaPagoTemp); 
    } 
    const CleanFormaPago  =  () => { 
    setDatosFormaPago([]);
    }

    const AddDocRel =  (docrel) => {  
      setDatosDocRel([...datosDocRel, docrel]) 
    }
    const DeleteDocRel =  (codigoDocRel) => { 
    let datosDocRelTemp =  datosDocRel.filter(docrel => docrel.codigoDocRel !== codigoDocRel) 
    setDatosDocRel(datosDocRelTemp); 
    } 
    const CleanDocRel  =  () => { 
      setDatosDocRel([]);
    } 
  
    const CleanDatosCpe =  () => { 
      setDatosCpe(cpeInitialize);
    }

    const CleanDatosContingencia =  () => { 
      setDatosContingencia(contingenciaInitialize);
    }

    const CleanDatosReceptor =  () => { 
      setDatosReceptor(receptorInitialize);
    }
  
    const CleanDatosReferencia =  () => { 
      setDatosReferencia(referenciaInitialize);
    }

    const CleanDatosAdicionales =  () => { 
      setDatosAdicionales(adicionalesInitialize);
    }

    const CleanDatosTotales =  () => { 
      setDatosTotales(totalesInitialize);
    }
 

    return (
      <EmisionContext.Provider 
        value={{setCpeDatos, CleanDatosCpe, setReceptorDatos, CleanDatosReceptor, setReferenciaDatos, CleanDatosReferencia, setTotales, CleanDatosTotales, setContingenciaDatos, CleanDatosContingencia, setAdicionalesDatos, CleanDatosAdicionales,
                 AddItem, DeleteItem, CleanItem, AddFormaPago, DeleteFormaPago, CleanFormaPago, AddDocRel, DeleteDocRel, CleanDocRel,
                datosCpe, datosReceptor,datosItem,datosTotales,datosReferencia, datosAdicionales, datosContingencia, datosDocRel, datosFormaPago }}>
        {children}
      </EmisionContext.Provider>
    )
  }
  
export {EmisionProvider, useEmision}