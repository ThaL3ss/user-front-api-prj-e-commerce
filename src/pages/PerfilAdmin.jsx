import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Navbar from '../components/Navbar'
import { ShieldIcon } from '../components/icons'

// Painel administrativo (rota /admin, protegida por role: admin via PrivateRoute).
// Os dados do usuário vêm de GET /usuarios/me.
export default function PerfilAdmin() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let active = true
    api
      .get('/usuarios/me')
      .then(({ data }) => active && setUser(data))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Navbar userName={user?.nome ?? ''} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <ShieldIcon className="text-[#7B4FDB]" />
          <h2 className="text-2xl font-bold text-gray-900">Administração</h2>
        </div>

        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900">Gerenciar produtos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Área administrativa do ShirtStore.
          </p>
          <Link to="/perfil" className="mt-4 inline-block text-sm font-medium text-[#7B4FDB] hover:underline">
            ← Voltar ao perfil
          </Link>
        </section>
      </main>
    </div>
  )
}
