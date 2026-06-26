import { Link, NavLink } from 'react-router-dom'
import Logo from '../../../assets/Logo_ShirtStore.svg'
import { UserOutIcon, ShopIcon, CartIcon } from '../../../assets/icons/Icons'
import { menuItems } from '../../../data/Topbar/Topbar.data'
import { useCart } from '../../../context/CartContext'
import styles from './Topbar.module.css'

const menuRoutes = {
  'Início': '/',
  'Catálogo': '/catalogo',
}

export default function TopBar() {
  const { itemCount } = useCart()

  return (
    <section className={styles.section}>
      <img src={Logo} alt="ShirtStore" className={styles.logo} />

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item}
            to={menuRoutes[item]}
            className={({ isActive }) =>
              isActive ? styles.active : ''
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>

      <div className={styles.headerIcons}>
        <Link to="/login" className={styles.iconLink}>
          <UserOutIcon />
        </Link>

        <Link to="/carrinho" className={styles.iconLink}>
          <div className={styles.cartWrapper}>
            <CartIcon />
            {itemCount > 0 && (
              <span className={styles.cartBadge}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </section>
  )
}