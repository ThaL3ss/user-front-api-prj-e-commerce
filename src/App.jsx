import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import PerfilAdmin from './pages/PerfilAdmin'
import PaginaProduto from './pages/PaginaProduto'
import PrivateRoute from './components/PrivateRoute'

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

      {/* Página de produto com avaliações */}
      <Route
        path="/produto/:id"
        element={
          <PrivateRoute>
            <PaginaProduto />
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
