import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { getCart, addCartItem, clearServerCart } from '../services/cart/Cart.service'

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

  const [synced, setSynced] = useState(false)

  // Sync with server on login
  useEffect(() => {
    if (!isAuthenticated) {
      setSynced(false)
      return
    }
    if (synced) return

    const localItems = readStorage()

    if (localItems.length > 0) {
      // localStorage has items — push to server as backup (ignore size, backend stores by product)
      localItems.forEach((item) => {
        addCartItem({
          produto_id: String(item.productId),
          nome: item.name,
          preco: item.price,
          quantidade: item.quantity,
        }).catch(() => {})
      })
      setSynced(true)
    } else {
      // localStorage empty — try to restore from server (items come back without size)
      dispatch({ type: 'SET_LOADING', payload: true })
      getCart()
        .then(({ data }) => {
          const serverItems = data?.item_carrinho ?? []
          if (serverItems.length > 0) {
            const mapped = serverItems.map((i) => ({
              id: generateId(),
              productId: i.produto?.sku ?? String(i.produto_id),
              name: i.produto?.nome ?? 'Produto',
              price: Number(i.preco_unitario),
              size: null,
              quantity: i.quantidade,
              image: null,
            }))
            dispatch({ type: 'LOAD_CART', payload: mapped })
            writeStorage(mapped)
          } else {
            dispatch({ type: 'SET_LOADING', payload: false })
          }
        })
        .catch(() => dispatch({ type: 'SET_LOADING', payload: false }))
        .finally(() => setSynced(true))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  // Persist to localStorage on every change
  useEffect(() => {
    writeStorage(state.items)
  }, [state.items])

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
        produto_id: String(product.id),
        nome: product.name,
        preco: product.price,
        quantidade: 1,
      }).catch(() => {})
    }
  }, [isAuthenticated])

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }, [])

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
