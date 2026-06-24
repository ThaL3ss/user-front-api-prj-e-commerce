import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Perfil from './pages/perfil/Perfil'
import PerfilAdmin from './pages/perfil/PerfilAdmin'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Autenticada */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />

      {/* Apenas admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin>
            <PerfilAdmin />
          </PrivateRoute>
        }
      />

      {/* Fallbacks */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
