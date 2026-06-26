import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { getCart, addCartItem, updateCartItem, removeCartItem, clearServerCart } from '../services/cart/Cart.service'

const CartContext = createContext(null)

const STORAGE_KEY = 'cart'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw).items ?? []) : []
  } catch {
    return []
  }
}

function writeStorage(items) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ items, updatedAt: new Date().toISOString() }),
  )
}

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload, loading: false }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.size === action.payload.size,
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: generateId(), quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== id) }
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()

  const [state, dispatch] = useReducer(cartReducer, {
    items: readStorage(),
    loading: false,
  })

  const [initialized, setInitialized] = useState(false)

  // Sync from server on login
  useEffect(() => {
    if (!isAuthenticated) {
      setInitialized(true)
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })

    getCart()
      .then(({ data }) => {
        const serverItems = data?.itens ?? data?.items ?? []
        if (serverItems.length > 0) {
          const mapped = serverItems.map((i) => ({
            id: String(i.id),
            productId: i.produto_id ?? i.productId,
            name: i.nome_produto ?? i.name,
            price: i.preco_unitario ?? i.price,
            size: i.tamanho ?? i.size,
            quantity: i.quantidade ?? i.quantity,
            image: i.url_imagem ?? i.image ?? null,
          }))
          dispatch({ type: 'LOAD_CART', payload: mapped })
          writeStorage(mapped)
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
          const localItems = readStorage()
          if (localItems.length > 0) {
            localItems.forEach((item) => {
              addCartItem({
                produto_id: item.productId,
                nome_produto: item.name,
                preco_unitario: item.price,
                tamanho: item.size,
                quantidade: item.quantity,
                url_imagem: item.image ?? null,
              }).catch(() => {})
            })
          }
        }
      })
      .catch(() => {
        dispatch({ type: 'SET_LOADING', payload: false })
      })
      .finally(() => {
        setInitialized(true)
      })
  }, [isAuthenticated])

  // Persist to localStorage on every change
  useEffect(() => {
    writeStorage(state.items)
  }, [state.items])

  // Sync to server after init (debounced)
  useEffect(() => {
    if (!initialized || !isAuthenticated) return

    const timer = setTimeout(() => {
      state.items.forEach((item) => {
        updateCartItem(item.id, item.quantity).catch(() => {})
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [state.items, initialized, isAuthenticated])

  const addItem = useCallback((product, size) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? null,
        size,
      },
    })

    if (isAuthenticated) {
      addCartItem({
        produto_id: product.id,
        nome_produto: product.name,
        preco_unitario: product.price,
        tamanho: size,
        quantidade: 1,
        url_imagem: product.image ?? null,
      }).catch(() => {})
    }
  }, [isAuthenticated])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    if (isAuthenticated) {
      removeCartItem(id).catch(() => {})
    }
  }, [isAuthenticated])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    if (isAuthenticated && quantity > 0) {
      updateCartItem(id, quantity).catch(() => {})
    } else if (isAuthenticated && quantity <= 0) {
      removeCartItem(id).catch(() => {})
    }
  }, [isAuthenticated])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
    if (isAuthenticated) {
      clearServerCart().catch(() => {})
    }
  }, [isAuthenticated])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const value = {
    items: state.items,
    loading: state.loading,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de um <CartProvider>')
  }
  return ctx
}
