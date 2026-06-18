import { useState } from 'react'
import api from '../../services/api'
import { StarFilledIcon, StarIcon } from '../icons'

export default function EscreverAvaliacao({ idProduto, onSucesso, onCancelar }) {
  const [nota, setNota] = useState(0)
  const [hover, setHover] = useState(0)
  const [titulo, setTitulo] = useState('')
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (nota === 0) {
      setErro('Selecione uma nota de 1 a 5 estrelas.')
      return
    }
    setErro('')
    setEnviando(true)
    try {
      await api.post('/avaliacoes', {
        id_produto: idProduto,
        nota,
        titulo: titulo.trim() || undefined,
        comentario: comentario.trim() || undefined,
      })
      onSucesso()
    } catch (err) {
      const status = err.response?.status
      if (status === 409) {
        setErro('Você já avaliou este produto.')
      } else {
        setErro('Não foi possível enviar a avaliação. Tente novamente.')
      }
    } finally {
      setEnviando(false)
    }
  }

  const estrelaAtiva = hover || nota

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Escrever Avaliação</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Seletor de nota */}
        <div>
          <p className="mb-1 text-sm font-medium text-gray-700">Sua nota</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`${v} estrela${v > 1 ? 's' : ''}`}
                onClick={() => setNota(v)}
                onMouseEnter={() => setHover(v)}
                onMouseLeave={() => setHover(0)}
                className="text-yellow-400 transition-transform hover:scale-110 focus:outline-none"
              >
                {v <= estrelaAtiva ? (
                  <StarFilledIcon width="28" height="28" />
                ) : (
                  <StarIcon width="28" height="28" className="text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Título (opcional) */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="titulo-avaliacao">
            Título <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            id="titulo-avaliacao"
            type="text"
            maxLength={100}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Resumo da sua experiência"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Comentário (opcional) */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="comentario-avaliacao">
            Comentário <span className="text-gray-400">(opcional, até 255 caracteres)</span>
          </label>
          <textarea
            id="comentario-avaliacao"
            rows={4}
            maxLength={255}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Conte sua experiência com o produto..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
          <p className="mt-0.5 text-right text-xs text-gray-400">{comentario.length}/255</p>
        </div>

        {erro && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {erro}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={enviando}
            className="flex-1 rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
          >
            {enviando ? 'Enviando...' : 'Salvar Comentário'}
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
