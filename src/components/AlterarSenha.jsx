import { useState } from 'react'
import api from '../services/api'
import InputField from './InputField'
import { LockIcon, EyeIcon, EyeOffIcon } from './icons'

// Campo de senha com botão mostrar/ocultar (cada campo controla seu próprio estado).
function PasswordField({ id, label, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <InputField
      id={id}
      type={show ? 'text' : 'password'}
      label={label}
      placeholder="••••••••"
      icon={<LockIcon />}
      value={value}
      onChange={onChange}
      autoComplete="new-password"
      minLength={8}
      required
      trailing={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-gray-400 transition hover:text-gray-600"
          aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  )
}

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validação local: confirmação precisa bater com a nova senha.
    if (novaSenha !== confirmar) {
      setError('A confirmação não corresponde à nova senha.')
      return
    }

    setLoading(true)
    try {
      await api.patch('/usuarios/me/senha', {
        senha_atual: senhaAtual,
        nova_senha: novaSenha,
      })
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmar('')
      setSuccess('Senha alterada com sucesso.')
    } catch {
      // Mensagem genérica — nunca detalhar o que falhou.
      setError('Não foi possível alterar a senha. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordField
          id="senha-atual"
          label="Senha atual"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />
        <PasswordField
          id="nova-senha"
          label="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <PasswordField
          id="confirmar-senha"
          label="Confirmar nova senha"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700" role="status">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-gradient-to-r from-[#7B4FDB] to-[#E040A0] px-5 py-2.5 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </form>
  )
}
