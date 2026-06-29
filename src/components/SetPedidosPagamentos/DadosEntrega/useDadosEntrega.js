import { useCallback, useState } from "react";
import enderecoService from "../../../services/endereco/Endereco.service";

export const RECEBER = "Receber";
export const RETIRAR = "Retirar na Loja";

// isola estado e regras de seleção de endereço, sem nenhuma responsabilidade de UI
export function useDadosEntrega(usuarioUuid, onEnderecoChange) {
  const [opcaoEntrega, setOpcaoEntrega] = useState(RETIRAR);
  const [modalAberto, setModalAberto] = useState(false);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const carregarEnderecos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await enderecoService.listarEnderecosUsuario(usuarioUuid);
      setEnderecos(data);
    } catch {
      setError("Não foi possível carregar seus endereços.");
    } finally {
      setLoading(false);
    }
  }, [usuarioUuid]);

  const abrirModal = useCallback(() => {
    setModalAberto(true);
    carregarEnderecos();
  }, [carregarEnderecos]);

  const fecharModal = useCallback(() => setModalAberto(false), []);

  const handleToggle = useCallback(
    (opcao) => {
      setOpcaoEntrega(opcao);
      if (opcao === RECEBER) abrirModal();
    },
    [abrirModal],
  );

  const handleSelecionarEndereco = useCallback(
    async (id) => {
      try {
        const endereco = await enderecoService.buscarEndereco(id);
        setEnderecoSelecionado(endereco);
        onEnderecoChange?.(id);
      } catch {
        setError("Não foi possível selecionar esse endereço.");
      } finally {
        fecharModal();
      }
    },
    [onEnderecoChange, fecharModal],
  );

  return {
    opcaoEntrega,
    modalAberto,
    enderecos,
    enderecoSelecionado,
    loading,
    error,
    abrirModal,
    fecharModal,
    handleToggle,
    handleSelecionarEndereco,
  };
}
