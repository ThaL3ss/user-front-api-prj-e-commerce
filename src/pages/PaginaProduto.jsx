import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import Navbar from '../components/Navbar'
import AvaliacoesComentarios from '../components/AvaliacoesComentarios'
import { MinusIcon, PlusIcon, CartIcon } from '../components/icons'

const TAMANHOS = ['P', 'M', 'G']

export default function PaginaProduto() {
  const { id } = useParams()

  const [userName, setUserName] = useState('')
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null)
  const [quantidade, setQuantidade] = useState(1)

  useEffect(() => {
    api.get('/usuarios/me').then(({ data }) => setUserName(data.nome ?? '')).catch(() => {})
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    api
      .get(`/produto/${id}`)
      .then(({ data }) => {
        if (active) setProduto(data)
      })
      .catch(() => {
        if (active) setErro('Produto não encontrado.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  function decQtd() {
    setQuantidade((q) => Math.max(1, q - 1))
  }

  function incQtd() {
    setQuantidade((q) => q + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={userName} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {loading && <p className="text-sm text-gray-500">Carregando produto...</p>}

        {!loading && erro && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {erro}
          </p>
        )}

        {!loading && produto && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* ── Coluna esquerda: imagem + detalhes ── */}
            <div className="flex flex-col gap-6">
              {/* Placeholder de imagem — catálogo não vincula Imagem a Produto ainda */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                <div className="flex h-80 items-center justify-center bg-gray-50 text-gray-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>

              {/* Detalhes do produto */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900">{produto.nomeProduto}</h1>

                {produto.categoria && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-purple-500">
                    {produto.categoria.nomeCategoria}
                  </p>
                )}

                <p className="mt-4 text-2xl font-bold text-purple-600">
                  {Number(produto.precoProduto).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>

                {/* Tamanho */}
                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Tamanho</p>
                  <div className="flex gap-2">
                    {TAMANHOS.map((tam) => (
                      <button
                        key={tam}
                        type="button"
                        onClick={() => setTamanhoSelecionado(tam)}
                        className={`h-9 w-9 rounded-lg border text-sm font-semibold transition
                          ${tamanhoSelecionado === tam
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-400'
                          }`}
                      >
                        {tam}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantidade */}
                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Quantidade</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={decQtd}
                      aria-label="Diminuir quantidade"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-purple-400 hover:text-purple-600"
                    >
                      <MinusIcon />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-900">{quantidade}</span>
                    <button
                      type="button"
                      onClick={incQtd}
                      aria-label="Aumentar quantidade"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-purple-400 hover:text-purple-600"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                {/* Adicionar ao carrinho */}
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 active:scale-95"
                >
                  <CartIcon width="18" height="18" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>

            {/* ── Coluna direita: avaliações ── */}
            <div>
              <AvaliacoesComentarios idProduto={produto.idProduto} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
