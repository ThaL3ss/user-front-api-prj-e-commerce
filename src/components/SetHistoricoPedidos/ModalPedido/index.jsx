import { useCallback, useEffect, useRef, useState } from "react";
import authService from "../../../services/login/Auth.service";
import { useAuth } from "../../../context/AuthContext";
import CardPedidoProduto from "../CardPedidoProduto/index";
import styles from "./ModalPedido.module.css";

const STATUS_STYLE = {
  PENDENTE: styles.statusDefault,
  ACEITO: styles.statusBleu,
  APROVADO: styles.statusGreen,
  SEPARACAO: styles.statusGreen,
  ENVIADO: styles.statusGreen,
  ENTREGUE: styles.statusGreen,

  REJEITADO: styles.statusRed,
  CANCELADO: styles.statusRed,

  DEVOLUCAO: styles.statusYellow,
};

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// recebera um pedido como prop, no formato retornado por GET /pedido:
// { pedido_uuid, pedido_valor_total, status_pedido, pedido_created_at }
export default function ModalPedido({
  pedido,
  onComprarNovamente,
  onVerNotaFiscal,
}) {
  const { user } = useAuth();
  const usuarioUuid = user?.uuid ?? user?.id;

  const [open, setOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const carregadoRef = useRef(false);
  const imagensUrlsRef = useRef([]);

  // libera as object URLs das imagens quando o card sai da tela
  useEffect(() => {
    return () => {
      imagensUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // TODO: confirmar endereço e formato de retorno desse endpoint
      const { data } = await authService.get(
        `/item-pedido/${pedido.pedido_uuid}`,
        { headers: { usuario_uuid: usuarioUuid } },
      );

      const comImagem = await Promise.all(
        data.map(async (item) => {
          try {
            const { data: imagemBlob } = await authService.get(
              `/produto/picture/${item.id_produto}`,
              { responseType: "blob" },
            );
            const url = URL.createObjectURL(imagemBlob);
            imagensUrlsRef.current.push(url);
            return { ...item, imagem: url };
          } catch {
            return { ...item, imagem: null };
          }
        }),
      );

      setProdutos(comImagem);
      carregadoRef.current = true;
    } catch {
      setError("Não foi possível carregar os itens do pedido.");
    } finally {
      setLoading(false);
    }
  }, [pedido.pedido_uuid, usuarioUuid]);

  const handleToggle = () => {
    const proximoEstado = !open;
    setOpen(proximoEstado);

    if (proximoEstado && !carregadoRef.current) {
      carregarProdutos();
    }
  };

  // monta o payload do carrinho (produto + quantidade) e envia para o
  // carrinho do usuário (autenticado via header usuario_uuid)
  const handleComprarNovamente = useCallback(
    async (produto) => {
      const payload = {
        produtoId: produto.id_produto,
        quantidade: produto.quantidade ?? produto.item_pedido_quantidade,
      };

      try {
        // TODO: confirmar endereço desse endpoint
        await authService.post("/carrinho", payload, {
          headers: { usuario_uuid: usuarioUuid },
        });

        onComprarNovamente?.(payload);
      } catch {
        // TODO: feedback visual de erro ao adicionar no carrinho
      }
    },
    [onComprarNovamente, usuarioUuid],
  );

  const statusClass =
    STATUS_STYLE[pedido.status_pedido] ?? styles.statusDefault;

  return (
    <div className={styles.container}>
      <button type="button" className={styles.card} onClick={handleToggle}>
        <span className={`${styles.text} ${styles.pedido}`}>
          Pedido: <strong>#{pedido.pedido_uuid}</strong>
        </span>

        {!open && (
          <span className={`${styles.text} ${styles.preco}`}>
            R$ <span>{pedido.pedido_valor_total}</span>
          </span>
        )}

        <span className={`${styles.text} ${styles.data}`}>
          Realizado em: {formatarData(pedido.pedido_created_at)}
        </span>

        <div className={`${styles.text} ${styles.status} ${statusClass}`}>
          {pedido.status_pedido}
        </div>
      </button>

      {!open && (
        <div className={styles.pagination}>
          <span />
          <span />
          <span />
        </div>
      )}

      {open && (
        <div className={styles.detalhes}>
          {loading && <p className={styles.loading}>Carregando itens...</p>}

          {!loading && error && <p className={styles.error}>{error}</p>}

          {!loading &&
            !error &&
            produtos.map((produto) => (
              <CardPedidoProduto
                key={produto.id_produto}
                produto={produto}
                onComprarNovamente={handleComprarNovamente}
              />
            ))}

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.notaFiscalButton}
              onClick={() => onVerNotaFiscal?.(pedido.pedido_uuid)}
            >
              Ver Nota Fiscal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
