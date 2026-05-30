import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../services/api'
import InputField from './InputField'
import { MapPinIcon, HashIcon, TrashIcon, PencilIcon } from './icons'

const EMPTY_FORM = { nome: '', cep: '', rua: '', numero: '', complemento: '' }

export default function Enderecos() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [enderecos, setEnderecos] = useState([])

  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // Evita refetch do mesmo CEP (inclusive ao preencher o form na edição).
  const lastFetchedCep = useRef('')

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  // Lista os endereços do usuário logado (token via interceptor do axios).
  const carregar = useCallback(() => {
    api
      .get('/enderecos')
      .then(({ data }) => setEnderecos(Array.isArray(data) ? data : []))
      .catch(() => setEnderecos([]))
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  // Busca automática no ViaCEP assim que o CEP tiver 8 dígitos.
  useEffect(() => {
    const digits = form.cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setCepError('')
      return
    }
    if (digits === lastFetchedCep.current) return
    lastFetchedCep.current = digits

    let active = true
    setCepLoading(true)
    setCepError('')
    fetch(`https://viacep.com.br/ws/${digits}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        if (data.erro) {
          setCepError('CEP não encontrado')
          return
        }
        // Preenche automaticamente a rua.
        setForm((f) => ({ ...f, rua: data.logradouro || f.rua }))
      })
      .catch(() => {
        // Falha de rede (não é "CEP inexistente"): libera o mesmo CEP para nova tentativa.
        lastFetchedCep.current = ''
        if (active) setCepError('CEP não encontrado')
      })
      .finally(() => {
        if (active) setCepLoading(false)
      })

    return () => {
      active = false
    }
  }, [form.cep])

  function resetForm() {
    setForm(EMPTY_FORM)
    setEditingId(null)
    lastFetchedCep.current = ''
    setCepError('')
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const cepDigits = form.cep.replace(/\D/g, '')
    if (cepDigits.length !== 8) {
      setError('Informe um CEP válido com 8 dígitos.')
      return
    }

    // Monta o payload conforme a API (numero/complemento opcionais).
    const payload = {
      nome: form.nome,
      cep: cepDigits,
      rua: form.rua,
    }
    if (form.numero !== '') payload.numero = Number(form.numero)
    if (form.complemento !== '') payload.complemento = form.complemento

    setSaving(true)
    try {
      if (editingId != null) {
        await api.put(`/enderecos/${editingId}`, payload)
      } else {
        await api.post('/enderecos', payload)
      }
      resetForm()
      carregar()
    } catch {
      // Mensagem genérica.
      setError('Não foi possível salvar o endereço. Verifique os dados e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  function handleEdit(endereco) {
    lastFetchedCep.current = (endereco.cep || '').replace(/\D/g, '')
    setEditingId(endereco.id)
    setForm({
      nome: endereco.nome ?? '',
      cep: endereco.cep ?? '',
      rua: endereco.rua ?? '',
      numero: endereco.numero != null ? String(endereco.numero) : '',
      complemento: endereco.complemento ?? '',
    })
    setCepError('')
    setError('')
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/enderecos/${id}`)
      if (editingId === id) resetForm()
      carregar()
    } catch {
      setError('Não foi possível excluir o endereço. Tente novamente.')
    }
  }

  return (
    <div>
      {editingId != null && (
        <p className="mb-4 text-sm font-medium text-gray-500">Editando endereço</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="end-nome"
          label="Nome do endereço"
          placeholder="Ex: Casa, Trabalho"
          icon={<MapPinIcon />}
          value={form.nome}
          onChange={(e) => setField('nome', e.target.value)}
          maxLength={50}
          required
        />

        <div>
          <InputField
            id="end-cep"
            label="CEP"
            placeholder="00000-000"
            inputMode="numeric"
            value={form.cep}
            onChange={(e) => setField('cep', e.target.value)}
            required
          />
          {cepLoading && <p className="mt-1.5 text-sm text-gray-500">Buscando CEP...</p>}
          {cepError && <p className="mt-1.5 text-sm text-red-600">{cepError}</p>}
        </div>

        <InputField
          id="end-rua"
          label="Rua"
          placeholder="Preenchido automaticamente pelo CEP"
          icon={<MapPinIcon />}
          value={form.rua}
          onChange={(e) => setField('rua', e.target.value)}
          maxLength={150}
          required
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id="end-numero"
            label="Número (opcional)"
            placeholder="123"
            inputMode="numeric"
            icon={<HashIcon />}
            value={form.numero}
            onChange={(e) => setField('numero', e.target.value.replace(/\D/g, ''))}
          />
          <InputField
            id="end-complemento"
            label="Complemento (opcional)"
            placeholder="Apto, bloco..."
            value={form.complemento}
            onChange={(e) => setField('complemento', e.target.value)}
            maxLength={100}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-[#7B4FDB] to-[#E040A0] px-5 py-2.5 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Salvando...' : editingId != null ? 'Salvar alterações' : 'Adicionar endereço'}
          </button>
          {editingId != null && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg px-4 py-2.5 font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de endereços cadastrados */}
      <div className="mt-6 border-t border-gray-100 pt-6">
        {enderecos.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum endereço cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {enderecos.map((end) => (
              <li
                key={end.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-gray-100 p-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{end.nome}</p>
                  <p className="text-sm text-gray-600">
                    {end.rua}
                    {end.numero != null ? `, ${end.numero}` : ''}
                    {end.complemento ? ` — ${end.complemento}` : ''}
                  </p>
                  <p className="text-sm text-gray-400">CEP: {end.cep}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(end)}
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-[#7B4FDB] transition hover:bg-[#7B4FDB]/10"
                    aria-label={`Editar ${end.nome}`}
                  >
                    <PencilIcon /> Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(end.id)}
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    aria-label={`Excluir ${end.nome}`}
                  >
                    <TrashIcon /> Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
