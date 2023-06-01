import { 
    useState, 
    createContext,
    useContext, 
  } from 'react'

  import moment from 'moment'; 

  const fechaActual = moment(new Date(moment(new Date()).add(5, 'h').format())).format("YYYY-MM-DD");
 
  const EmisionContext = createContext()
 
  const useEmision = () => {
    return useContext(EmisionContext)
  }

  const EmisionProvider = ({children}) => {

    const [datosCpe, setDatosCpe] = useState({
      fechaCpe:fechaActual,
      fechaVencimiento:fechaActual,
      moneda: 'PEN'
    });
    const [datosReceptor, setDatosReceptor] = useState(null);  
    const [datosReferencia, setDatosReferencia] = useState({
      fechaCpeRef:fechaActual,
      tipoNotaCredito:'01'
    });  
    const [datosItem, setDatosItem] = useState([]);
    const [datosTotales, setDatosTotales] = useState({
      subTotal:0,
      igv:0,
      subTotalGravadas:0,
      total:0
    });

    const setCpeDatos =  async (campo, valor) => { 
      setDatosCpe({ ...datosCpe, [campo]: valor }); 
      console.log("setCpeDatos", datosCpe)
    }

    const setReceptorDatos =  async (campo, valor) => { 
      setDatosReceptor({ ...datosReceptor, [campo]: valor }); 
      console.log("setReceptorDatos", datosReceptor)
    }

    const setReferenciaDatos =  async (campo, valor) => { 
      setDatosReferencia({ ...datosReferencia, [campo]: valor }); 
      console.log("setReferenciaDatos", datosReferencia)
    }
  
    const AddItem =  (item) => { 
        console.log(item);

        item.igv = (item.venta * 0.18).toFixed(2);
        item.total = (item.venta + parseFloat(item.igv)).toFixed(2);
        item.venta = parseFloat(item.venta).toFixed(2);
        item.precio = parseFloat(item.precio).toFixed(2);
        setDatosItem([...datosItem, item])
        console.log("AddItem", datosItem) 
    }

    const DeleteItem =  (codigo) => { 
      let datosItemTemp =  datosItem.filter(det => det.codigo !== codigo) 
      setDatosItem(datosItemTemp); 
    }
 
    const setTotales =  () => {  
      let subtotal = 0;
      datosItem.map((item) => { 
        subtotal += parseFloat(item.venta)
      })

      console.log("subtotal",subtotal);

      let igv = (subtotal * 0.18).toFixed(2);
      let total = (subtotal + parseFloat(igv)).toFixed(2);
  
      setDatosTotales({ ...datosTotales, 'subTotal': subtotal.toFixed(2),'igv': igv,'subTotalGravadas': subtotal.toFixed(2),'total': total  });  
  
    }

  
    return (
      <EmisionContext.Provider value={{setCpeDatos,setReceptorDatos,setReferenciaDatos, AddItem,DeleteItem, setTotales, datosCpe,datosReceptor,datosItem,datosTotales,datosReferencia}}>
        {children}
      </EmisionContext.Provider>
    )
  }
 
  
 
export {EmisionProvider, useEmision}