import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cadastroService from '../../services/cadastro/Cadastro.service'
import Logo from '../../assets/Logo_ShirtStore.svg'
import InputField from '../../components/shared/Commons/InputField/InputField'
import ButtonPrimary from '../../components/shared/Commons/Buttons/Buttons_Primary'
import { EyeIcon, EyeOffIcon } from '../../assets/icons/Icons'
import { cadastroInputPresets } from "../../data/Inputs/InputField_Cadastro.data";
import { buttonPrimaryPresets } from '../../data/Buttons/Button_Primary.data'
import Toast from '../../components/shared/Commons/Toasts/Toast'
import { getToastPreset } from '../../data/Toasts/Toast.data'
import styles from './Cadastro.module.css'

export default function Cadastro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (form.senha !== form.confirmarSenha) {
      const preset =
        getToastPreset('senha-error')

      setToast({
        visible: true,
        ...preset,
      })
      return
    }

    try {
      setLoading(true)

      await cadastroService.post('/auth/cadastro', {
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        cpf: form.cpf,
        senha: form.senha,
      })

      const preset =
        getToastPreset('cadastro-success')

      setToast({
        visible: true,
        ...preset,
      })
      navigate('/login')
    } catch (error) {
      console.error(error)
      const preset =
        getToastPreset('cadastro-error')

      setToast({
        visible: true,
        ...preset,
      })
    } finally {
      setLoading(false)
    }
  }

  const cadastroButton = buttonPrimaryPresets.filter(
    (button) => button.id === 'cadastro-submit'
  )

  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: '',
  })

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <img src={Logo} alt="ShirtStore" className={styles.logo} />

          <h1 className={styles.title}>Criar conta</h1>
          <p className={styles.subtitle}>Cadastre-se na ShirtStore</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {cadastroInputPresets.map((input) => (
            <InputField
              key={input.id}
              label={input.label}
              name={input.name}
              type={
                input.id === 'senha'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : input.id === 'confirmarSenha'
                    ? showConfirmPassword
                      ? 'text'
                      : 'password'
                    : input.type
              }
              placeholder={input.placeholder}
              icon={input.icon}
              rightIcon={
                input.id === 'senha' ? (
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                ) : input.id === 'confirmarSenha' ? (
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                ) : null
              }
              value={form[input.name]}
              onChange={handleChange}
            />
          ))}

          {cadastroButton.map((button) => (
            <ButtonPrimary
              key={button.id}
              type="submit"
              variant={button.variant}
              size={button.size}
              full={button.full}
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : button.text}
            </ButtonPrimary>
          ))}

          <p className={styles.loginText}>
            Já tem uma conta?{' '}
            <Link to="/login" className={styles.loginLink}>
              Entrar
            </Link>
          </p>
        </form>
      </section>

      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast({
            visible: false,
            title: '',
            message: '',
            type: '',
          })
        }
      />
    </main>
  )
}