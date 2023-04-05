import { 
    useState, 
    createContext,
    useContext, 
  } from 'react'

  const initSearchCpe = { 
    "fechaDesde" : "-",
    "fechaHasta" : "-",
    "rucEmisor":"-",
    "tipoCpe":"-",
    "serieCpe":"-",
    "numeroDesde":"-",
    "numeroHasta":"-",
    "estadoCpe":"-",
    "rucReceptor":"-",
    "Sucursal":"-"
  }

  const initFilterCpe = {  
    "tipoCpe":"-", 
    "estadoCpe":"-", 
  }
   
  const initAuthContextPropsState = { 
    searchCpe: initSearchCpe,
    setSearchCpe: () => {}, 
  }
  
  const EmisionContext = createContext(initAuthContextPropsState)
 
  const useSearch = () => {
    return useContext(EmisionContext)
  }

  const EmisionProvider = ({children}) => {
    const [searchCpe, setSearchCpe]  = useState(initSearchCpe) 
    const [filterCpe, setFilterCpe]  = useState(initFilterCpe) 
   
    const setDataCpe = (cpe) => { 
        setSearchCpe(cpe); 
    }

    const setDataFilterCpe = (cpe) => { 
      setFilterCpe(cpe); 
  }
  
    return (
      <EmisionContext.Provider value={{ searchCpe, setDataCpe, filterCpe, setDataFilterCpe}}>
        {children}
      </EmisionContext.Provider>
    )
  }
 
  
 
export {EmisionProvider, useSearch}