import { 
  useState, 
  createContext,
  useContext,
  useEffect,
} from 'react'
 


const initAuthContextPropsState = { 
  currentUser: undefined,
  setCurrentUser: () => {},
  setEmisores: () => {},
  setCurrentEmisor: () => {},
  logout: () => {},
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [emisores, setEmisores] = useState()
  const [currentEmisor, setCurrentEmisor] = useState()
 
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('data'));
      const emisoresData = JSON.parse(localStorage.getItem('emisores.content'));
      const currentEmisorData = JSON.parse(localStorage.getItem('emisores.content[0]'));
  
      if (userData) {
        setCurrentUser(userData);
      }
  
      if (emisoresData) {
        setEmisores(emisoresData);
      }
  
      if (currentEmisorData) {
        setCurrentEmisor(currentEmisorData);
      }
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  }, []);

  const logout = () => {
    setCurrentUser(undefined)
    setEmisores(undefined)
    setCurrentEmisor(undefined)
    localStorage.setItem('data', undefined);
    localStorage.setItem('emisores.content', undefined);
    localStorage.setItem('emisores.content[0]', undefined);    
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, emisores, setEmisores, currentEmisor, setCurrentEmisor, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
 
export {AuthProvider, useAuth}
