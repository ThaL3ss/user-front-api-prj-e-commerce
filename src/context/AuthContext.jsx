import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AuthContext = createContext(null)

// Decodifica o payload do JWT sem biblioteca externa.
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [token, setToken] = useState(() => localStorage.getItem('accessToken'))
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  // Role extraída do JWT; cai para o user salvo caso o token não traga a claim.
  const role = token ? decodeToken(token)?.role ?? user?.role ?? null : null

  // Autentica via POST /auth/login e persiste a sessão no localStorage.
  const login = useCallback(async (email, senha) => {
    const { data } = await api.post('/auth/login', { email, senha })

    localStorage.setItem('accessToken', data.accessToken)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user))

    setToken(data.accessToken)
    setUser(data.user ?? null)

    return data
  }, [])

  // Limpa o localStorage e redireciona para /login.
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)

    navigate('/login')
  }, [navigate])

  const value = {
    token,
    user,
    role,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um <AuthProvider>')
  }
  return ctx
}
