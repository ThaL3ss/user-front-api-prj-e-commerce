import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/icons'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Mensagem de sucesso vinda do cadastro (navigate('/login', { state: { success } })).
  const [success, setSuccess] = useState(location.state?.success ?? '')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await login(email, senha)
      navigate('/perfil')
    } catch {
      // Mensagem genérica — nunca detalhar o que falhou.
      setError('Não foi possível entrar. Verifique suas credenciais e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Cabeçalho */}
        <div className={styles.header}>
          <Logo size="md" />
          <h1 className={styles.title}>ShirtStore</h1>
          <p className={styles.subtitle}>Entre na sua conta</p>
        </div>

        {/* Card */}
        <div className={styles.card}>
          {success && (
            <p className={styles.success} role="status">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
              id="email"
              type="email"
              label="Email"
              placeholder="seu@email.com"
              icon={<MailIcon />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <InputField
              id="senha"
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              placeholder="••••••••"
              icon={<LockIcon />}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className={styles.toggle}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            <div className={styles.options}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className={styles.checkbox}
                />
                Lembrar-me
              </label>
              <a href="#" className={styles.forgot}>
                Esqueceu a senha?
              </a>
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className={styles.signup}>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className={styles.signupLink}>
              Cadastre-se
            </Link>
          </p>
        </div>

        <p className={styles.terms}>
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
