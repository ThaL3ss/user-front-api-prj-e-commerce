// Formata rua + número + complemento num único texto de exibição.
export function formatarEnderecoResumo(endereco) {
  const numero = endereco.numero != null ? `, ${endereco.numero}` : ""
  const complemento = endereco.complemento ? ` — ${endereco.complemento}` : ""

  return `${endereco.rua}${numero}${complemento}`
}
