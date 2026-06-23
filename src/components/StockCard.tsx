interface Props {
  stock: any;
  onDelete?: (id: number) => void;
  onEdit?: (stock: any) => void;
}

export default function StockCard({
  stock,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-lg transition">
      <div>
        <span className="text-xs text-blue-600">
          Estoque #{stock.idEstoque}
        </span>

        <h3 className="font-semibold mt-2 text-lg">
          Quantidade: {stock.quantidadeEstoque}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Disponibilidade:{" "}
          {stock.disponibilidadeEstoque}
        </p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onEdit?.(stock)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
        >
          Editar
        </button>

        <button
          onClick={() =>
            onDelete?.(stock.idEstoque)
          }
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}