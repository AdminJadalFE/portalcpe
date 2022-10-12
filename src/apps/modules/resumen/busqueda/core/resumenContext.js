import { 
    useState, 
    createContext,
    useContext, 
  } from 'react'

  const initSearchResumen = { 
    "fechaDesde" : "-",
    "fechaHasta" : "-",
    "rucEmisor":"-",
    "tipoCpe":"-"
  }
   
  const initAuthContextPropsState = { 
    searchResumen: initSearchResumen,
    setSearchResumen: () => {}, 
  }
  
  const ResumenContext = createContext(initAuthContextPropsState)
 
  const useSearch = () => {
    return useContext(ResumenContext)
  }

  const ResumenProvider = ({children}) => {
    const [searchResumen, setSearchResumen]  = useState(initSearchResumen) 
   
    const setDataResumen = (cpe) => {
        setSearchResumen(cpe); 
    }
  
    return (
      <ResumenContext.Provider value={{ searchResumen, setDataResumen}}>
        {children}
      </ResumenContext.Provider>
    )
  }
 
  
 
export {ResumenProvider, useSearch}