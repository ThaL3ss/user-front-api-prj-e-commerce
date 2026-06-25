import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/Logo_ShirtStore.svg'
import InputField from '../../components/shared/Commons/InputField/InputField'
import ButtonPrimary from '../../components/shared/Commons/Buttons/Buttons_Primary'
import { EyeIcon, EyeOffIcon } from '../../assets/icons/Icons'
import { loginInputPresets } from '../../data/Inputs/InputField_Login.data'
import { buttonPrimaryPresets } from '../../data/Buttons/Button_Primary.data'
import Toast from '../../components/shared/Commons/Toasts/Toast'
import { getToastPreset } from '../../data/Toasts/Toast.data'
import Topbar from "../../components/shared/Topbar/Topbar";
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    senha: '',
  })

  const [showPassword, setShowPassword] = useState(false)
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

    try {
      setLoading(true)

      await login(form.email, form.senha)

      navigate('/perfil')
    } catch (error) {
      console.error(error)
      const preset =
        getToastPreset('login-error')

      setToast({
        visible: true,
        ...preset,
      })
    } finally {
      setLoading(false)
    }
  }

  const loginButton = buttonPrimaryPresets.filter(
    (button) => button.id === 'login-submit'
  )

  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: '',
  })

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Topbar />
      </header>
      <section className={styles.container}>
        <div className={styles.logoContent}>
          <img src={Logo} alt="ShirtStore" className={styles.logo} />

          <h1 className={styles.title}>ShirtStore</h1>
          <p className={styles.subtitle}>Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {loginInputPresets.map((input) => (
            <InputField
              key={input.id}
              label={input.label}
              name={input.name}
              type={
                input.id === 'senha'
                  ? showPassword
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
                ) : null
              }
              value={form[input.name]}
              onChange={handleChange}
            />
          ))}

          <div className={styles.options}>
            <label className={styles.rememberLabel}>
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>

            <Link to="/recuperar-senha" className={styles.forgotPassword}>
              Esqueceu a senha?
            </Link>
          </div>

          {loginButton.map((button) => (
            <ButtonPrimary
              key={button.id}
              type="submit"
              variant={button.variant}
              size={button.size}
              full={button.full}
              disabled={loading}
            >
              {loading ? 'Entrando...' : button.text}
            </ButtonPrimary>
          ))}

          <p className={styles.registerText}>
            Não tem uma conta?{' '}
            <Link to="/cadastro" className={styles.registerLink}>
              Cadastre-se
            </Link>
          </p>
        </form>

        <p className={styles.terms}>
          Ao continuar, você concorda com nossos Termos de Serviço e Política de
          Privacidade
        </p>
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


