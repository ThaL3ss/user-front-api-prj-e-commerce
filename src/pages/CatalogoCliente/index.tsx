import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import ProductCardCliente from "../../components/ProductCardCliente";

import { useEffect, useState } from "react";
import { productService } from "../../services/productService";

import styles from "./catalogocliente.module.css";

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
    product.nomeProduto?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Hero />

      <main className={styles.container}>
        {/* Campo de busca */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
          />

          <select className={styles.select}>
            <option>Todas</option>
          </select>

          <select className={styles.select}>
            <option>Nome (A-Z)</option>
          </select>
        </div>

        {/* Quantidade encontrada */}
        <div className={styles.counter}>
          {filteredProducts.length} produtos encontrados
        </div>

        {/* Lista de produtos */}
        {loading ? (
          <div className={styles.loading}>
            Carregando produtos...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={styles.empty}>
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className={styles.grid}>
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