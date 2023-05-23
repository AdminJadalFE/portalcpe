import { 
    useState, 
    createContext,
    useContext, 
  } from 'react'
 
  const EmisionContext = createContext()
 
  const useEmision = () => {
    return useContext(EmisionContext)
  }

  const EmisionProvider = ({children}) => {

    const [datosCpe, setDatosCpe] = useState(null);
    const [datosReceptor, setDatosReceptor] = useState(null);  
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
  
    const AddItem =  (item) => { 
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
        subtotal += item.venta
      })

      console.log("subtotal",subtotal);

      let igv = subtotal * 0.18;
      let total = subtotal + igv;
  
      setDatosTotales({ ...datosTotales, 'subTotal': subtotal,'igv': igv,'subTotalGravadas': subtotal,'total': total  });  
  
    }

  
    return (
      <EmisionContext.Provider value={{setCpeDatos,setReceptorDatos, AddItem,DeleteItem, setTotales, datosCpe,datosReceptor,datosItem,datosTotales}}>
        {children}
      </EmisionContext.Provider>
    )
  }
 
  
 
export {EmisionProvider, useEmision}