import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Logo from '../components/Logo'
import InputField from '../components/InputField'
import { UserIcon, MailIcon, IdIcon, LockIcon, EyeIcon, EyeOffIcon } from '../components/icons'

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EEF2FF] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size="md" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">ShirtStore</h1>
          <p className="mt-1 text-gray-500">Crie sua conta</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="text-gray-400 transition hover:text-gray-600"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
              />
              <p className="mt-1.5 text-sm text-gray-500">Mínimo de 8 caracteres</p>
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
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-[#7B4FDB] hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
