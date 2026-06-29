import authService from '../login/Auth.service'

const enderecoService = {
  // GET /endereco/usuario — lista os endereços do usuário autenticado
  listarEnderecosUsuario(usuarioUuid) {
    return authService
      .get('/endereco/usuario', { headers: { usuario_uuid: usuarioUuid } })
      .then(({ data }) => data)
  },

  // GET /endereco/{id} — detalhe de um endereço selecionado
  buscarEndereco(id) {
    return authService.get(`/endereco/${id}`).then(({ data }) => data)
  },
}

export default enderecoService
