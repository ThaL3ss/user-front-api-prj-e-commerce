import styles from './Buttons_Secondary.module.css'

export default function ButtonSecondary({
  children,
  icon,
  variant = 'secondary',
  size = 'md',
  full = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${full ? styles.full : ''}
        ${className}
      `.trim()}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}