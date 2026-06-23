import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/footer";
import ProductCardCliente from "../components/ProductCardCliente";

import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function CatalogoCliente() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadProducts() {
    try {
      const data = await productService.findAll();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.nomeProduto
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Campo de busca */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              border
              rounded-lg
              px-4
              py-3
            "
          />

          <select className="border rounded-lg px-4">
            <option>Todas</option>
          </select>

          <select className="border rounded-lg px-4">
            <option>Nome (A-Z)</option>
          </select>
        </div>

        {/* Quantidade encontrada */}
        <div className="mb-4 text-sm text-gray-500">
          {filteredProducts.length} produtos encontrados
        </div>

        {/* Lista de produtos */}
        {loading ? (
          <div className="text-center py-10">
            Carregando produtos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-6
            "
          >
            {filteredProducts.map((product) => (
              <ProductCardCliente
                key={product.idProduto}
                product={product}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}