interface Props {
  category: any;
  onDelete?: (id: number) => void;
  onEdit?: (category: any) => void;
}

export default function CategoryCard({
  category,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-lg transition">
      <div>
        <span className="text-xs text-blue-600">
          Categoria #{category.idCategoria}
        </span>

        <h3 className="font-semibold mt-2 text-lg">
          {category.nomeCategoria}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {category.descricaoCategoria}
        </p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onEdit?.(category)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
        >
          Editar
        </button>

        <button
          onClick={() =>
            onDelete?.(category.idCategoria)
          }
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}