import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import { UserIcon, MailIcon, IdIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/icons'
import styles from './Cadastro.module.css'

export default function Cadastro() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // CPF apenas com dígitos (a API espera 11 dígitos numéricos).
      const cpfDigits = cpf.replace(/\D/g, '')
      await api.post('/auth/register', { nome, email, cpf: cpfDigits, senha })
      navigate('/login', { state: { success: 'Conta criada com sucesso! Faça login para continuar.' } })
    } catch {
      // Mensagem genérica — nunca detalhar o que falhou.
      setError('Não foi possível criar a conta. Verifique os dados e tente novamente.')
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
          <p className={styles.subtitle}>Crie sua conta</p>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
              id="nome"
              type="text"
              label="Nome Completo"
              placeholder="Seu nome"
              icon={<UserIcon />}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              required
            />

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
              id="cpf"
              type="text"
              inputMode="numeric"
              label="CPF"
              placeholder="000.000.000-00"
              icon={<IdIcon />}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              autoComplete="off"
              required
            />

            <div>
              <InputField
                id="senha"
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                placeholder="••••••••"
                icon={<LockIcon />}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
                minLength={8}
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
              <p className={styles.hint}>Mínimo de 8 caracteres</p>
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <p className={styles.signup}>
            Já tem uma conta?{' '}
            <Link to="/login" className={styles.signupLink}>
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
