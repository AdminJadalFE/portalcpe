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
  
  const SearchContext = createContext(initAuthContextPropsState)
 
  const useSearch = () => {
    return useContext(SearchContext)
  }

  const SearchProvider = ({children}) => {
    const [searchCpe, setSearchCpe]  = useState(initSearchCpe) 
    const [filterCpe, setFilterCpe]  = useState(initFilterCpe) 
   
    const setDataCpe = (cpe) => { 
        setSearchCpe(cpe); 
    }

    const setDataFilterCpe = (cpe) => { 
      setFilterCpe(cpe); 
  }
  
    return (
      <SearchContext.Provider value={{ searchCpe, setDataCpe, filterCpe, setDataFilterCpe}}>
        {children}
      </SearchContext.Provider>
    )
  }
 
  
 
export {SearchProvider, useSearch}