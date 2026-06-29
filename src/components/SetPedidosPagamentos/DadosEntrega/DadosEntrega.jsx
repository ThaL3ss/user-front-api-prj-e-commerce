import { lojaRetirada } from "../../../data/Loja/Loja.data";
import { formatarEnderecoResumo } from "../../../utils/endereco";
import ToggleBar from "../ToggleBar/ToggleBar";
import ModalEnderecos from "../ModalEnderecos/ModalEnderecos";
import { RECEBER, RETIRAR, useDadosEntrega } from "./useDadosEntrega";
import styles from "./DadosEntrega.module.css";

// avisa o pai qual endereço foi escolhido (endereco_id), usado no POST /pedido
export default function DadosEntrega({ usuarioUuid, onEnderecoChange }) {
  const {
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
  } = useDadosEntrega(usuarioUuid, onEnderecoChange);

  return (
    <div className={styles.container}>
      <ToggleBar
        option1={RECEBER}
        option2={RETIRAR}
        activeOption={opcaoEntrega}
        onToggle={handleToggle}
      />

      {opcaoEntrega === RECEBER && (
        <div className={styles.info}>
          {enderecoSelecionado ? (
            <>
              <span className={styles.nome}>{enderecoSelecionado.nome}</span>
              <span className={styles.detalhe}>
                {formatarEnderecoResumo(enderecoSelecionado)}
              </span>
              <button
                type="button"
                className={styles.trocarButton}
                onClick={abrirModal}
              >
                Trocar endereço
              </button>
            </>
          ) : (
            <span className={styles.detalhe}>
              Selecione um endereço de entrega.
            </span>
          )}
        </div>
      )}

      {opcaoEntrega === RETIRAR && (
        <div className={styles.info}>
          <span className={styles.nome}>{lojaRetirada.nome}</span>
          <span className={styles.detalhe}>{lojaRetirada.prazo}</span>
        </div>
      )}

      <ModalEnderecos
        visible={modalAberto}
        enderecos={enderecos}
        loading={loading}
        error={error}
        onSelect={handleSelecionarEndereco}
        onClose={fecharModal}
      />
    </div>
  );
}
