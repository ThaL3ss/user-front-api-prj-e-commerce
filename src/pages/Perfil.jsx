import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Enderecos from '../components/Enderecos'
import AlterarSenha from '../components/AlterarSenha'
import CollapsibleCard from '../components/CollapsibleCard'
import { MailIcon, BoxIcon, ShieldIcon, MapPinIcon, ChevronDownIcon, LogoutIcon } from '../components/icons'

export default function Perfil() {
  const { logout } = useAuth()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enderecosOpen, setEnderecosOpen] = useState(false)

  // Todos os dados do usuário vêm de GET /usuarios/me.
  useEffect(() => {
    let active = true
    api
      .get('/usuarios/me')
      .then(({ data }) => {
        if (active) setUser(data)
      })
      .catch(() => {
        // 401 já é tratado no interceptor do axios; demais erros: mensagem genérica.
        if (active) setError('Não foi possível carregar seu perfil. Tente novamente.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const isAdmin = user?.role === 'admin'
  const initial = user?.nome?.trim()?.charAt(0)?.toUpperCase() ?? '?'

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Navbar userName={user?.nome ?? ''} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Meu Perfil</h2>

        {loading && <p className="text-gray-500">Carregando...</p>}

        {!loading && error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!loading && user && (
          <div className="space-y-6">
            {/* Card de perfil */}
            <section className="flex items-center gap-5 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7B4FDB] to-[#E040A0] text-3xl font-bold text-white">
                {initial}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{user.nome}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-gray-500">
                  <span className="text-gray-400"><MailIcon /></span>
                  {user.email}
                </p>
                {isAdmin && (
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#7B4FDB]">
                    <ShieldIcon width="16" height="16" />
                    Administrador
                  </span>
                )}
              </div>
            </section>

            {/* Cards de atalho — grid de 2 colunas (lado a lado) */}
            <div>
              <div className="grid gap-6 sm:grid-cols-2">
                <a
                  href="#"
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <BoxIcon width="28" height="28" className="text-[#7B4FDB]" />
                  <h4 className="mt-3 text-lg font-bold text-gray-900">Meus pedidos</h4>
                  <p className="mt-1 text-sm text-gray-500">Acompanhe seus pedidos</p>
                </a>

                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition hover:shadow-xl"
                  >
                    <ShieldIcon width="28" height="28" className="text-[#7B4FDB]" />
                    <h4 className="mt-3 text-lg font-bold text-gray-900">Administração</h4>
                    <p className="mt-1 text-sm text-gray-500">Gerenciar produtos</p>
                  </Link>
                ) : (
                  // Card colapsável: expande o gerenciador de endereços (com ViaCEP) abaixo.
                  <button
                    type="button"
                    onClick={() => setEnderecosOpen((o) => !o)}
                    aria-expanded={enderecosOpen}
                    className="rounded-xl border border-gray-100 bg-white p-6 text-left shadow-lg transition hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <MapPinIcon width="28" height="28" className="text-[#7B4FDB]" />
                      <ChevronDownIcon
                        className={`text-gray-500 transition-transform duration-300 ${enderecosOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-gray-900">Meus Endereços</h4>
                    <p className="mt-1 text-sm text-gray-500">Gerencie seus endereços</p>
                  </button>
                )}
              </div>

              {/* Painel de endereços, expandido ao clicar no card (só cliente) */}
              {!isAdmin && (
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    enderecosOpen ? 'mt-6 grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                      <Enderecos />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Segurança — alterar senha (colapsável, fechado por padrão) */}
            <CollapsibleCard title="Segurança">
              <AlterarSenha />
            </CollapsibleCard>

            {/* Card de sessão */}
            <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
              <h4 className="mb-4 text-lg font-bold text-gray-900">Sessão</h4>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
              >
                <LogoutIcon /> Sair da conta
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
