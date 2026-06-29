import { formatarEnderecoResumo } from "../../../utils/endereco";
import styles from "./ModalEnderecos.module.css";

export default function ModalEnderecos({
  visible,
  enderecos,
  loading,
  error,
  onSelect,
  onClose,
}) {
  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3 className={styles.title}>Selecione um endereço</h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        {loading && <p className={styles.hint}>Carregando endereços...</p>}

        {!loading && error && <p className={styles.error}>{error}</p>}

        {!loading && !error && enderecos.length === 0 && (
          <p className={styles.hint}>Nenhum endereço cadastrado.</p>
        )}

        {!loading && !error && enderecos.length > 0 && (
          <ul className={styles.list}>
            {enderecos.map((endereco) => (
              <li key={endereco.id}>
                <button
                  type="button"
                  className={styles.item}
                  onClick={() => onSelect(endereco.id)}
                >
                  <span className={styles.itemNome}>{endereco.nome}</span>
                  <span className={styles.itemDetalhe}>
                    {formatarEnderecoResumo(endereco)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
