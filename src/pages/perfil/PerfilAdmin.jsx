import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../../services/login/Auth.service'
import Navbar from '../../components/shared/Navbar/Navbar'
import { ShieldIcon } from '../../assets/icons/Icons'
import styles from './PerfilAdmin.module.css'

// Painel administrativo (rota /admin, protegida por role: admin via PrivateRoute).
// Os dados do usuário vêm de GET /usuarios/me.
export default function PerfilAdmin() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let active = true
    authService
      .get('/usuarios/me')
      .then(({ data }) => active && setUser(data))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return (
    <div className={styles.page}>
      <Navbar userName={user?.nome ?? ''} />

      <main className={styles.main}>
        <div className={styles.header}>
          <ShieldIcon className={styles.titleIcon} />
          <h2 className={styles.heading}>Administração</h2>
        </div>

        <section className={styles.card}>
          <h3 className={styles.cardTitle}>Gerenciar produtos</h3>
          <p className={styles.cardText}>
            Área administrativa do ShirtStore.
          </p>
          <Link to="/perfil" className={styles.backLink}>
            ← Voltar ao perfil
          </Link>
        </section>
      </main>
    </div>
  )
}
