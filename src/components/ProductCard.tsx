import { Link } from "react-router-dom";

interface Props {
  product: any;
  onDelete?: (id: number) => void;
  onEdit?: (product: any) => void;
}

export default function ProductCard({
  product,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        overflow-hidden
        shadow-sm
        hover:shadow-lg
        transition
        flex
        flex-col
        justify-between
      "
    >
      {/* IMAGEM */}
      <img
        src={
          product.urlImagem && product.urlImagem.trim() !== ""
            ? product.urlImagem
            : "https://via.placeholder.com/400x250?text=Sem+Imagem"
        }
        alt={product.nomeProduto}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        <div>
          <span className="text-xs text-blue-600">
            Categoria #{product.categoriaId}
          </span>

          <h3 className="font-semibold mt-2 text-lg">
            {product.nomeProduto}
          </h3>

          <div className="mt-4">
            <span className="font-bold text-blue-600 text-xl">
              R$ {Number(product.precoProduto).toFixed(2)}
            </span>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Estoque #{product.estoqueId}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Link
            to={`/produto/${product.idProduto}`}
            className="
              flex-1
              text-center
              bg-blue-600
              text-white
              py-2
              rounded-lg
              hover:bg-blue-700
            "
          >
            Ver
          </Link>

          <button
            onClick={() => onEdit?.(product)}
            className="
              flex-1
              bg-yellow-500
              text-white
              py-2
              rounded-lg
              hover:bg-yellow-600
            "
          >
            Editar
          </button>

          <button
            onClick={() => onDelete?.(product.idProduto)}
            className="
              flex-1
              bg-red-500
              text-white
              py-2
              rounded-lg
              hover:bg-red-600
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}