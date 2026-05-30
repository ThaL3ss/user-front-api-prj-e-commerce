import axios from 'axios'

// Instância única do axios apontando para a API de usuários.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Adiciona o Authorization: Bearer <accessToken> em toda requisição.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Em caso de 401 (token ausente/inválido/expirado): limpa a sessão e volta ao login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

export default api
