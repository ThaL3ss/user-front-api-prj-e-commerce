import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import { HomeIcon, BoxIcon, StarIcon, CartIcon, UserIcon, LogoutIcon, HelpIcon } from './icons'

// Navbar das telas autenticadas (ver perfil-adm.png).
// O link "Admin" só aparece para role === 'admin'.
export default function Navbar({ userName }) {
  const { role, logout } = useAuth()
  const isAdmin = role === 'admin'

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 text-sm font-medium transition ${
      isActive ? 'text-[#7B4FDB]' : 'text-gray-600 hover:text-[#7B4FDB]'
    }`

  return (
    <header className="bg-white shadow-sm">
      {/* Faixa superior: logo + título + ajuda */}
      <div className="relative flex items-center px-4 py-3">
        <Link to="/perfil" className="flex items-center">
          <Logo size="sm" />
        </Link>
        <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-base font-bold text-gray-900">
          E-commerce ShirtStore
        </h1>
        <button
          type="button"
          className="ml-auto text-gray-400 transition hover:text-gray-600"
          aria-label="Ajuda"
        >
          <HelpIcon />
        </button>
      </div>

      {/* Faixa de navegação: links + usuário/logout */}
      <nav className="flex items-center border-t border-gray-100 px-4 py-2.5">
        <div className="flex flex-1 items-center justify-center gap-8">
          <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-[#7B4FDB]">
            <HomeIcon /> Catálogo
          </a>
          {/* "Meus Pedidos" não aparece para cliente — acesso só pelo card no perfil. */}
          {isAdmin && (
            <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-[#7B4FDB]">
              <BoxIcon /> Meus Pedidos
            </a>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              <StarIcon /> Admin
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button type="button" className="text-gray-500 transition hover:text-gray-700" aria-label="Carrinho">
            <CartIcon />
          </button>
          <span className="flex items-center gap-1.5 text-sm text-gray-700">
            <UserIcon />
            {userName}
          </span>
          <button
            type="button"
            onClick={logout}
            className="text-gray-500 transition hover:text-red-600"
            aria-label="Sair"
          >
            <LogoutIcon />
          </button>
        </div>
      </nav>
    </header>
  )
}
