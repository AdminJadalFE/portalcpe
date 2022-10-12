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
   
  const initAuthContextPropsState = { 
    searchCpe: initSearchCpe,
    setSearchCpe: () => {}, 
  }
  
  const SearchContext = createContext(initAuthContextPropsState)
 
  const useSearch = () => {
    return useContext(SearchContext)
  }

  const SearchProvider = ({children}) => {
    const [searchCpe, setSearchCpe]  = useState(initSearchCpe) 
   
    const setDataCpe = (cpe) => { 
        setSearchCpe(cpe); 
    }
  
    return (
      <SearchContext.Provider value={{ searchCpe, setDataCpe}}>
        {children}
      </SearchContext.Provider>
    )
  }
 
  
 
export {SearchProvider, useSearch}