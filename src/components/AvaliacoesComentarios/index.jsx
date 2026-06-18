import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { StarFilledIcon, StarIcon } from '../icons'
import EscreverAvaliacao from '../EscreverAvaliacao'

function EstrelasDisplay({ nota, tamanho = 16 }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((v) =>
        v <= nota ? (
          <StarFilledIcon key={v} width={tamanho} height={tamanho} className="text-yellow-400" />
        ) : (
          <StarIcon key={v} width={tamanho} height={tamanho} className="text-gray-300" />
        ),
      )}
    </span>
  )
}

function BarraDistribuicao({ contagens, total }) {
  return (
    <div className="flex flex-col gap-1">
      {[5, 4, 3, 2, 1].map((estrela) => {
        const qtd = contagens[estrela] ?? 0
        const pct = total > 0 ? Math.round((qtd / total) * 100) : 0
        return (
          <div key={estrela} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-3 text-right">{estrela}</span>
            <StarFilledIcon width={12} height={12} className="text-yellow-400 shrink-0" />
            <div className="flex-1 overflow-hidden rounded-full bg-gray-100 h-2">
              <div
                className="h-2 rounded-full bg-yellow-400 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-4 text-right">{qtd}</span>
          </div>
        )
      })}
    </div>
  )
}

function CardAvaliacao({ avaliacao, onCurtir, onResponder, isAdmin }) {
  const [respostaTexto, setRespostaTexto] = useState('')
  const [mostrarFormResposta, setMostrarFormResposta] = useState(false)
  const [enviandoResposta, setEnviandoResposta] = useState(false)
  const [erroResposta, setErroResposta] = useState('')

  const uuidCurto = avaliacao.UUID?.slice(0, 8)

  async function handleEnviarResposta(e) {
    e.preventDefault()
    if (!respostaTexto.trim()) return
    setEnviandoResposta(true)
    setErroResposta('')
    try {
      await onResponder(avaliacao.id_avaliacao, respostaTexto.trim())
      setRespostaTexto('')
      setMostrarFormResposta(false)
    } catch {
      setErroResposta('Não foi possível enviar a resposta.')
    } finally {
      setEnviandoResposta(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-400 text-xs font-bold text-white">
            {uuidCurto?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{uuidCurto}</p>
            <p className="text-xs text-gray-400">
              {new Date(avaliacao.data_criacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        <EstrelasDisplay nota={avaliacao.nota} tamanho={14} />
      </div>

      {avaliacao.titulo && (
        <p className="mt-2 text-sm font-semibold text-gray-700">{avaliacao.titulo}</p>
      )}
      {avaliacao.comentario && (
        <p className="mt-1 text-sm text-gray-600">{avaliacao.comentario}</p>
      )}

      {/* Ações: curtir */}
      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onCurtir(avaliacao.id_avaliacao)}
          className="flex items-center gap-1 text-xs text-gray-400 transition hover:text-purple-600"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {avaliacao._count?.curtida ?? 0} útil
        </button>

        {isAdmin && !avaliacao.resposta && (
          <button
            type="button"
            onClick={() => setMostrarFormResposta((v) => !v)}
            className="text-xs text-purple-600 hover:underline"
          >
            Responder
          </button>
        )}
      </div>

      {/* Resposta do admin */}
      {avaliacao.resposta && (
        <div className="mt-3 rounded-lg bg-purple-50 border-l-2 border-purple-400 px-3 py-2">
          <p className="text-xs font-semibold text-purple-700">Resposta da loja</p>
          <p className="mt-0.5 text-xs text-gray-700">{avaliacao.resposta.comentario}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(avaliacao.resposta.data_criacao).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}

      {/* Formulário de resposta admin */}
      {isAdmin && mostrarFormResposta && (
        <form onSubmit={handleEnviarResposta} className="mt-3 flex flex-col gap-2">
          <textarea
            rows={2}
            maxLength={255}
            value={respostaTexto}
            onChange={(e) => setRespostaTexto(e.target.value)}
            placeholder="Escreva a resposta da loja..."
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-100"
          />
          {erroResposta && (
            <p className="text-xs text-red-600">{erroResposta}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={enviandoResposta}
              className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
            >
              {enviandoResposta ? 'Enviando...' : 'Enviar resposta'}
            </button>
            <button
              type="button"
              onClick={() => setMostrarFormResposta(false)}
              className="rounded-full border border-gray-200 px-4 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function AvaliacoesComentarios({ idProduto }) {
  const { role } = useAuth()
  const isAdmin = role === 'admin'

  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)

  const carregar = useCallback(() => {
    setLoading(true)
    setErro('')
    api
      .get(`/avaliacoes/produto/${idProduto}`)
      .then(({ data }) => setDados(data))
      .catch(() => setErro('Não foi possível carregar as avaliações.'))
      .finally(() => setLoading(false))
  }, [idProduto])

  useEffect(() => {
    carregar()
  }, [carregar])

  async function handleCurtir(idAvaliacao) {
    try {
      await api.post(`/avaliacoes/${idAvaliacao}/curtidas`)
      carregar()
    } catch {
      // curtida silenciosa — sem bloqueio de UX
    }
  }

  async function handleResponder(idAvaliacao, comentario) {
    await api.post(`/avaliacoes/${idAvaliacao}/respostas`, { comentario })
    carregar()
  }

  function handleSucessoAvaliacao() {
    setMostrarForm(false)
    carregar()
  }

  // calcula distribuição de notas
  const contagens = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  if (dados?.avaliacoes) {
    dados.avaliacoes.forEach(({ nota }) => {
      if (nota >= 1 && nota <= 5) contagens[nota]++
    })
  }

  const media = dados?.media_notas ?? 0
  const total = dados?.total ?? 0

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-900">Avaliações e Comentários</h2>

      {loading && <p className="text-sm text-gray-500">Carregando avaliações...</p>}

      {!loading && erro && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {erro}
        </p>
      )}

      {!loading && dados && (
        <>
          {/* Resumo */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">{media > 0 ? media.toFixed(1) : '—'}</span>
              <div className="flex flex-col gap-1">
                <EstrelasDisplay nota={Math.round(media)} tamanho={18} />
                <p className="text-xs text-gray-400">{total} avaliação{total !== 1 ? 'ões' : ''}</p>
              </div>
            </div>
            {total > 0 && <BarraDistribuicao contagens={contagens} total={total} />}
          </div>

          {/* Lista de avaliações */}
          {dados.avaliacoes.length === 0 ? (
            <p className="text-sm text-gray-400">Nenhuma avaliação ainda. Seja o primeiro!</p>
          ) : (
            <div className="flex flex-col gap-3">
              {dados.avaliacoes.map((av) => (
                <CardAvaliacao
                  key={av.id_avaliacao}
                  avaliacao={av}
                  onCurtir={handleCurtir}
                  onResponder={handleResponder}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}

          {/* Formulário / botão de escrever avaliação */}
          {mostrarForm ? (
            <EscreverAvaliacao
              idProduto={idProduto}
              onSucesso={handleSucessoAvaliacao}
              onCancelar={() => setMostrarForm(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setMostrarForm(true)}
              className="self-start rounded-full border border-purple-600 px-5 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white"
            >
              Escrever Avaliação
            </button>
          )}
        </>
      )}
    </section>
  )
}
