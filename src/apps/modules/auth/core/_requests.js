
const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/login` 

// Server should return AuthModel
export function login(email, password) {
  return ''
}
 
  
export function getUserByToken(token) {
  return ''
}
