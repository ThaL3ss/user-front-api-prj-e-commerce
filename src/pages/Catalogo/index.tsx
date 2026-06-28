import Header from "../../components/Header";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import CategoryCard from "../../components/CategoryCard";
import StockCard from "../../components/StockCard";
import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import { categoriaService } from "../../services/categoriaService";
import { estoqueService } from "../../services/estoqueService";

import styles from "./catalogo.module.css";

export default function Catalogo() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("produtos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    nomeProduto: "",
    precoProduto: "",
    categoriaId: "",
    estoqueId: "",
    urlImagem: "",
    nomeCategoria: "",
    descricaoCategoria: "",
    quantidadeEstoque: "",
    disponibilidadeEstoque: "",
  });

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



  async function loadCategories() {
    try {
      const data = await categoriaService.findAll();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadStocks() {
    try {
      const data = await estoqueService.findAll();
      setStocks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadStocks();
  }, []);

  function resetForm() {
    setFormData({
      nomeProduto: "",
      precoProduto: "",
      categoriaId: "",
      estoqueId: "",
      urlImagem: "",
      nomeCategoria: "",
      descricaoCategoria: "",
      quantidadeEstoque: "",
      disponibilidadeEstoque: "",
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  }

  // ===== CRUD PRODUTOS =====
  async function handleCreateProduct() {
    const novo = await productService.create({
      nomeProduto: formData.nomeProduto,
      precoProduto: Number(formData.precoProduto),
      categoriaId: Number(formData.categoriaId),
      estoqueId: Number(formData.estoqueId),
      urlImagem: formData.urlImagem,
    });
    setProducts((prev) => [...prev, novo]);
    resetForm();
  }

  async function handleUpdateProduct() {
    const updated = await productService.update(editingProduct.idProduto, {
      nomeProduto: formData.nomeProduto,
      precoProduto: Number(formData.precoProduto),
      categoriaId: Number(formData.categoriaId),
      estoqueId: Number(formData.estoqueId),
      urlImagem: formData.urlImagem,
    });

    setProducts((prev) =>
      prev.map((p) => (p.idProduto === updated.idProduto ? updated : p))
    );

    resetForm();
  }

  async function handleDeleteProduct(id: number) {
    await productService.delete(id);
    setProducts((prev) => prev.filter((p) => p.idProduto !== id));
  }

  function handleOpenEditProduct(product: any) {
    setEditingProduct(product);
    setFormData({
      ...formData,
      nomeProduto: product.nomeProduto ?? "",
      precoProduto: String(product.precoProduto ?? ""),
      categoriaId: String(product.categoriaId ?? ""),
      estoqueId: String(product.estoqueId ?? ""),
      urlImagem: product.urlImagem ?? "",
    });
    setIsModalOpen(true);
  }

  // ===== CRUD CATEGORIAS =====
  async function handleCreateCategory() {
    const nova = await categoriaService.create({
      nomeCategoria: formData.nomeCategoria,
      descricaoCategoria: formData.descricaoCategoria,
    });
    setCategories((prev) => [...prev, nova]);
    resetForm();
  }

  async function handleUpdateCategory() {
    const updated = await categoriaService.update(editingProduct.idCategoria, {
      nomeCategoria: formData.nomeCategoria,
      descricaoCategoria: formData.descricaoCategoria,
    });

    setCategories((prev) =>
      prev.map((c) =>
        c.idCategoria === updated.idCategoria ? updated : c
      )
    );

    resetForm();
  }

  async function handleDeleteCategory(id: number) {
    await categoriaService.delete(id);
    setCategories((prev) => prev.filter((c) => c.idCategoria !== id));
  }

  function handleOpenEditCategory(category: any) {
    setEditingProduct(category);
    setFormData({
      ...formData,
      nomeCategoria: category.nomeCategoria ?? "",
      descricaoCategoria: category.descricaoCategoria ?? "",
    });
    setIsModalOpen(true);
  }

  // ===== CRUD ESTOQUES =====
  async function handleCreateStock() {
    const novo = await estoqueService.create({
      quantidadeEstoque: Number(formData.quantidadeEstoque),
      disponibilidadeEstoque: formData.disponibilidadeEstoque,
    });
    setStocks((prev) => [...prev, novo]);
    resetForm();
  }

  async function handleUpdateStock() {
    const updated = await estoqueService.update(editingProduct.idEstoque, {
      quantidadeEstoque: Number(formData.quantidadeEstoque),
      disponibilidadeEstoque: formData.disponibilidadeEstoque,
    });

    setStocks((prev) =>
      prev.map((s) =>
        s.idEstoque === updated.idEstoque ? updated : s
      )
    );

    resetForm();
  }

  async function handleDeleteStock(id: number) {
    await estoqueService.delete(id);
    setStocks((prev) => prev.filter((s) => s.idEstoque !== id));
  }

  function handleOpenEditStock(stock: any) {
    setEditingProduct(stock);
    setFormData({
      ...formData,
      quantidadeEstoque: String(stock.quantidadeEstoque ?? ""),
      disponibilidadeEstoque: stock.disponibilidadeEstoque ?? "",
    });
    setIsModalOpen(true);
  }

  const filteredProducts = products.filter((p) =>
    p.nomeProduto?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Hero />

      <main className={styles.container}>
  <div className={styles.searchBar}>
    <input
      type="text"
      placeholder="Buscar produtos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.input}
    />
  </div>

  {loading ? (
    <div>Carregando produtos...</div>
  ) : filteredProducts.length === 0 ? (
    <div>Nenhum produto encontrado.</div>
  ) : (
    <div className={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.idProduto}
          product={product}
          onEdit={handleOpenEditProduct}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  )}
</main>


      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {/* mesmo conteúdo do modal */}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}