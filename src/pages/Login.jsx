import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/icons'

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EEF2FF] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="md" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">ShirtStore</h1>
          <p className="mt-1 text-gray-500">Entre na sua conta</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
          {success && (
            <p className="mb-5 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700" role="status">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="text-gray-400 transition hover:text-gray-600"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#7B4FDB]"
                />
                Lembrar-me
              </label>
              <a href="#" className="text-sm font-medium text-[#7B4FDB] hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-[#7B4FDB] to-[#E040A0] py-3 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="font-semibold text-[#7B4FDB] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
