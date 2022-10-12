import { 
  useState, 
  createContext,
  useContext, 
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
 
  const logout = () => {
    setCurrentUser(undefined)
    setEmisores(undefined)
    setCurrentEmisor(undefined)
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, emisores, setEmisores, currentEmisor, setCurrentEmisor, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
 
export {AuthProvider, useAuth}
