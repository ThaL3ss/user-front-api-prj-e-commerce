import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { productService } from "../../services/productService";

import styles from "./Produto.module.css";

export default function Produto() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      try {
        if (!id) return;

        const data = await productService.findById(id);

        console.log("Produto recebido:", data);

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />

        <div className={styles.loadingContainer}>
          <div className={styles.loadingSkeleton} />
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />

        <div className={styles.loadingContainer}>
          Produto não encontrado.
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Imagem */}
          <div className={styles.imageCard}>
            <img
              src={
                product.urlImagem && product.urlImagem.trim() !== ""
                  ? product.urlImagem
                  : "https://via.placeholder.com/600x600?text=Sem+Imagem"
              }
              alt={product.nomeProduto}
              className={styles.image}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x600?text=Sem+Imagem";
              }}
            />
          </div>

          {/* Dados */}
          <div className={styles.infoCard}>
            <span className={styles.category}>
              Categoria #{product.categoriaId}
            </span>

            <h1 className={styles.title}>
              {product.nomeProduto}
            </h1>

            <div className={styles.price}>
              R$ {Number(product.precoProduto).toFixed(2)}
            </div>

            <div className={styles.stock}>
              Estoque ID: {product.estoqueId}
            </div>

            <div className={styles.quantityContainer}>
              <p className={styles.quantityLabel}>
                Quantidade
              </p>

              <div className={styles.quantity}>
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                  className={styles.quantityButton}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>

            <button className={styles.buyButton}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}