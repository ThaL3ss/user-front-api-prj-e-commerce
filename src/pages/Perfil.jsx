import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Enderecos from '../components/Enderecos'
import AlterarSenha from '../components/AlterarSenha'
import CollapsibleCard from '../components/CollapsibleCard'
import { MailIcon, BoxIcon, ShieldIcon, MapPinIcon, ChevronDownIcon, LogoutIcon } from '../components/icons'
import styles from './Perfil.module.css'

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
    <div className={styles.page}>
      <Navbar userName={user?.nome ?? ''} />

      <main className={styles.main}>
        <h2 className={styles.heading}>Meu Perfil</h2>

        {loading && <p className={styles.loading}>Carregando...</p>}

        {!loading && error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!loading && user && (
          <div className={styles.content}>
            {/* Card de perfil */}
            <section className={styles.profileCard}>
              <div className={styles.avatar}>{initial}</div>
              <div>
                <h3 className={styles.name}>{user.nome}</h3>
                <p className={styles.email}>
                  <span className={styles.emailIcon}>
                    <MailIcon />
                  </span>
                  {user.email}
                </p>
                {isAdmin && (
                  <span className={styles.badge}>
                    <ShieldIcon width="16" height="16" />
                    Administrador
                  </span>
                )}
              </div>
            </section>

            {/* Cards de atalho — grid de 2 colunas (lado a lado) */}
            <div>
              <div className={styles.cardsGrid}>
                <a href="#" className={styles.shortcut}>
                  <BoxIcon width="28" height="28" className={styles.shortcutIcon} />
                  <h4 className={styles.shortcutTitle}>Meus pedidos</h4>
                  <p className={styles.shortcutText}>Acompanhe seus pedidos</p>
                </a>

                {isAdmin ? (
                  <Link to="/admin" className={styles.shortcut}>
                    <ShieldIcon width="28" height="28" className={styles.shortcutIcon} />
                    <h4 className={styles.shortcutTitle}>Administração</h4>
                    <p className={styles.shortcutText}>Gerenciar produtos</p>
                  </Link>
                ) : (
                  // Card colapsável: expande o gerenciador de endereços (com ViaCEP) abaixo.
                  <button
                    type="button"
                    onClick={() => setEnderecosOpen((o) => !o)}
                    aria-expanded={enderecosOpen}
                    className={styles.shortcut}
                  >
                    <div className={styles.cardHead}>
                      <MapPinIcon width="28" height="28" className={styles.shortcutIcon} />
                      <ChevronDownIcon
                        className={`${styles.cardChevron} ${enderecosOpen ? styles.cardChevronOpen : ''}`.trim()}
                      />
                    </div>
                    <h4 className={styles.shortcutTitle}>Meus Endereços</h4>
                    <p className={styles.shortcutText}>Gerencie seus endereços</p>
                  </button>
                )}
              </div>

              {/* Painel de endereços, expandido ao clicar no card (só cliente) */}
              {!isAdmin && (
                <div className={`${styles.panel} ${enderecosOpen ? styles.panelOpen : ''}`.trim()}>
                  <div className={styles.panelInner}>
                    <div className={styles.panelCard}>
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
            <section className={styles.sessionCard}>
              <h4 className={styles.sessionTitle}>Sessão</h4>
              <button type="button" onClick={logout} className={styles.logout}>
                <LogoutIcon /> Sair da conta
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
