import { Link } from 'react-router-dom'
import Topbar from '../../components/shared/Topbar/Topbar'
import { CartIcon, TrashIcon } from '../../assets/icons/Icons'
import ImgShirtDefault from '../../assets/img_shirt_default.png'
import { useCart } from '../../context/CartContext'
import styles from './Carrinho.module.css'

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className={styles.item}>
      <img
        src={item.image || ImgShirtDefault}
        alt={item.name}
        className={styles.itemImage}
      />

      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemSize}>
          Tamanho: <strong>{item.size}</strong>
        </p>
        <p className={styles.itemPrice}>{formatBRL(item.price)}</p>
      </div>

      <div className={styles.itemQty}>
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Diminuir quantidade"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>

      <p className={styles.itemTotal}>{formatBRL(item.price * item.quantity)}</p>

      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className={styles.removeBtn}
        aria-label="Remover item"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

export default function Carrinho() {
  const { items, loading, itemCount, total, clearCart } = useCart()

  const frete = total >= 299 ? 0 : 15
  const totalFinal = total + frete

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Topbar />
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>Meu Carrinho</h1>

        {loading && <p className={styles.loadingText}>Carregando carrinho...</p>}

        {!loading && items.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <CartIcon />
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para continuar</p>
            <Link to="/" className={styles.continueBtn}>
              Continuar comprando
            </Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className={styles.content}>
            <section className={styles.itemsList}>
              <div className={styles.itemsHeader}>
                <span>Produto</span>
                <span>Quantidade</span>
                <span>Subtotal</span>
                <span />
              </div>

              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <button
                type="button"
                onClick={clearCart}
                className={styles.clearBtn}
              >
                Limpar carrinho
              </button>
            </section>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Resumo do pedido</h2>

              <div className={styles.summaryRow}>
                <span>Itens ({itemCount})</span>
                <span>{formatBRL(total)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Frete</span>
                <span className={frete === 0 ? styles.freeShipping : ''}>
                  {frete === 0 ? 'Grátis' : formatBRL(frete)}
                </span>
              </div>

              <hr className={styles.divider} />

              <div className={styles.summaryTotal}>
                <strong>Total</strong>
                <strong>{formatBRL(totalFinal)}</strong>
              </div>

              {total > 0 && total < 299 && (
                <p className={styles.shippingHint}>
                  Falta {formatBRL(299 - total)} para frete grátis
                </p>
              )}

              <button
                type="button"
                className={styles.checkoutBtn}
                disabled
                title="Checkout em breve"
              >
                Finalizar compra
              </button>

              <Link to="/" className={styles.continueLink}>
                ← Continuar comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
