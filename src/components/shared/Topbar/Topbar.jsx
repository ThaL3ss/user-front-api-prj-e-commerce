import { Link, NavLink } from 'react-router-dom'
import Logo from '../../../assets/Logo_ShirtStore.svg'
import { UserOutIcon, ShopIcon } from '../../../assets/icons/Icons'
import { menuItems } from '../../../data/Topbar/Topbar.data'
import styles from './Topbar.module.css'

const menuRoutes = {
  'Início': '/',
  'Catálogo': '/catalogo',
}

export default function TopBar() {
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

        <Link to="/catalogo" className={styles.iconLink}>
          <ShopIcon />
        </Link>
      </div>
    </section>
  )
}