import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Perfil from './pages/perfil/Perfil'
import PerfilAdmin from './pages/perfil/PerfilAdmin'
import AppRoutes from './routes/AppRoutes'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />      
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin>
            <PerfilAdmin />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}