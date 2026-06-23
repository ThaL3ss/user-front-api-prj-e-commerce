import { Link } from "react-router-dom";

interface Props {
  product: any;
}

export default function ProductCardCliente({
  product,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        p-4
        shadow-sm
        hover:shadow-lg
        transition
        flex
        flex-col
        justify-between
        min-h-[350px]
      "
    >
      <div>
        <img
          src={
            product.urlImagem ||
            "https://via.placeholder.com/300x250?text=Sem+Imagem"
          }
          alt={product.nomeProduto}
          className="
            w-full
            h-56
            object-cover
            rounded-lg
            mb-4
          "
        />

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

      <div className="mt-6">
        <Link
          to={`/produto/${product.idProduto}`}
          className="
            block
            w-full
            text-center
            bg-blue-600
            text-white
            py-2
            rounded-lg
            hover:bg-blue-700
          "
        >
          Ver Produto
        </Link>
      </div>
    </div>
  );
}