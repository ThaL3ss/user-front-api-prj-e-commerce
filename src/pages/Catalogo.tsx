import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/footer";
import CategoryCard from "../components/CategoryCard";
import StockCard from "../components/StockCard";
import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { categoriaService } from "../services/categoriaService";
import { estoqueService } from "../services/estoqueService";

export default function Catalogo() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("produtos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Refatorado para ter campos específicos e evitar confusão de variáveis
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

  // ================= CARREGAMENTO DE DADOS =================
async function loadProducts() {
  try {
    const data = await productService.findAll();

    console.log("PRODUTOS RECEBIDOS:", data);

    setProducts(data);
  } catch (error) {
    console.error(error);
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

  // ================= CRUD PRODUTOS =================
  async function handleCreateProduct() {
    try {
      const novoProduto = await productService.create({
        nomeProduto: formData.nomeProduto,
        precoProduto: Number(formData.precoProduto),
        categoriaId: Number(formData.categoriaId),
        estoqueId: Number(formData.estoqueId),
        urlImagem: formData.urlImagem
      });
      setProducts((prev) => [...prev, novoProduto]);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto");
    }
  }

  async function handleUpdateProduct() {
    try {
      const updated = await productService.update(editingProduct.idProduto, {
        nomeProduto: formData.nomeProduto,
        precoProduto: Number(formData.precoProduto),
        categoriaId: Number(formData.categoriaId),
        estoqueId: Number(formData.estoqueId),
        urlImagem: formData.urlImagem
      });
      setProducts((prev) =>
        prev.map((product) => (product.idProduto === updated.idProduto ? updated : product))
      );
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto");
    }
  }

  async function handleDeleteProduct(id: number) {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((product) => product.idProduto !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto");
    }
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

  // ================= CRUD CATEGORIAS =================
  async function handleCreateCategory() {
    try {
      const novaCategoria = await categoriaService.create({
        nomeCategoria: formData.nomeCategoria,
        descricaoCategoria: formData.descricaoCategoria,
      });
      setCategories((prev) => [...prev, novaCategoria]);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar categoria");
    }
  }

  async function handleUpdateCategory() {
    try {
      const updated = await categoriaService.update(editingProduct.idCategoria, {
        nomeCategoria: formData.nomeCategoria,
        descricaoCategoria: formData.descricaoCategoria,
      });
      setCategories((prev) =>
        prev.map((category) => (category.idCategoria === updated.idCategoria ? updated : category))
      );
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar categoria");
    }
  }

  async function handleDeleteCategory(id: number) {
    if (!window.confirm("Deseja excluir esta categoria?")) return;
    try {
      await categoriaService.delete(id);
      setCategories((prev) => prev.filter((category) => category.idCategoria !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir categoria");
    }
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

  // ================= CRUD ESTOQUES =================
  async function handleCreateStock() {
    try {
      const novoEstoque = await estoqueService.create({
        quantidadeEstoque: Number(formData.quantidadeEstoque),
        disponibilidadeEstoque: formData.disponibilidadeEstoque,
      });
      setStocks((prev) => [...prev, novoEstoque]);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar estoque");
    }
  }

  async function handleUpdateStock() {
    try {
      const updated = await estoqueService.update(editingProduct.idEstoque, {
        quantidadeEstoque: Number(formData.quantidadeEstoque),
        disponibilidadeEstoque: formData.disponibilidadeEstoque,
      });
      setStocks((prev) =>
        prev.map((stock) => (stock.idEstoque === updated.idEstoque ? updated : stock))
      );
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar estoque");
    }
  }

  async function handleDeleteStock(id: number) {
    if (!window.confirm("Deseja excluir este estoque?")) return;
    try {
      await estoqueService.delete(id);
      setStocks((prev) => prev.filter((stock) => stock.idEstoque !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir estoque");
    }
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

  // ================= FILTRO =================
  const filteredProducts = products.filter((product) =>
    product.nomeProduto?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Hero />
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* ABAS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("produtos")}
            className={`px-4 py-2 rounded-lg ${activeTab === "produtos" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Produtos
          </button>
          <button
            onClick={() => setActiveTab("categorias")}
            className={`px-4 py-2 rounded-lg ${activeTab === "categorias" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Categorias
          </button>
          <button
            onClick={() => setActiveTab("estoques")}
            className={`px-4 py-2 rounded-lg ${activeTab === "estoques" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Estoques
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            {activeTab === "produtos" ? "Criar Produto" : activeTab === "categorias" ? "Criar Categoria" : "Criar Estoque"}
          </button>
        </div>

        {/* LISTA PRODUTOS */}
        {activeTab === "produtos" && (
          <>
            <div className="flex gap-4 mb-8">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="flex-1 border rounded-lg px-4 py-3"
              />
              <select className="border rounded-lg px-4"><option>Todas</option></select>
              <select className="border rounded-lg px-4"><option>Nome (A-Z)</option></select>
            </div>
            <div className="mb-4 text-sm text-gray-500">
              {filteredProducts.length} produtos encontrados
            </div>
            {loading ? (
              <div className="text-center py-10">Carregando produtos...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.idProduto}
                    product={product}
                    onDelete={handleDeleteProduct}
                    onEdit={handleOpenEditProduct}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* LISTA CATEGORIAS */}
        {activeTab === "categorias" && (
          <div className="bg-white rounded-xl p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">Categorias</h2>
            <div className="space-y-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.idCategoria}
                  category={category}
                  onEdit={() => handleOpenEditCategory(category)}
                  onDelete={() => handleDeleteCategory(category.idCategoria)}
                />
              ))}
            </div>
          </div>
        )}

        {/* LISTA ESTOQUES */}
        {activeTab === "estoques" && (
          <div className="bg-white rounded-xl p-8 shadow">
            <h2 className="text-2xl font-bold mb-6">Estoques</h2>
            <div className="space-y-4">
              {stocks.map((stock) => (
                <StockCard
                  key={stock.idEstoque}
                  stock={stock}
                  onEdit={() => handleOpenEditStock(stock)}
                  onDelete={() => handleDeleteStock(stock.idEstoque)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct
                ? `Editar ${activeTab === "produtos" ? "Produto" : activeTab === "categorias" ? "Categoria" : "Estoque"}`
                : `Criar ${activeTab === "produtos" ? "Produto" : activeTab === "categorias" ? "Categoria" : "Estoque"}`}
            </h2>
            <div className="space-y-4">
              
              {/* FORMULÁRIO DE PRODUTO */}
              {activeTab === "produtos" && (
                <>
                  <input
                    placeholder="Nome do Produto"
                    value={formData.nomeProduto}
                    onChange={(e) => setFormData({ ...formData, nomeProduto: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Preço"
                    value={formData.precoProduto}
                    onChange={(e) => setFormData({ ...formData, precoProduto: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                  <select
                    value={formData.categoriaId}
                    onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.idCategoria} value={category.idCategoria}>
                        {category.nomeCategoria}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.estoqueId}
                    onChange={(e) => setFormData({ ...formData, estoqueId: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  >
                    <option value="">Selecione um estoque</option>
                    {stocks.map((stock) => (
                      <option key={stock.idEstoque} value={stock.idEstoque}>
                        Estoque #{stock.idEstoque}
                      </option>
                    ))}
                  </select>
                  <input
                    placeholder="URL da Imagem"
                    value={formData.urlImagem}
                    onChange={(e) => setFormData({ ...formData, urlImagem: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                </>
              )}

              {/* FORMULÁRIO DE CATEGORIA */}
              {activeTab === "categorias" && (
                <>
                  <input
                    placeholder="Nome da Categoria"
                    value={formData.nomeCategoria}
                    onChange={(e) => setFormData({ ...formData, nomeCategoria: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                  <input
                    placeholder="Descrição da Categoria"
                    value={formData.descricaoCategoria}
                    onChange={(e) => setFormData({ ...formData, descricaoCategoria: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                </>
              )}

              {/* FORMULÁRIO DE ESTOQUE */}
              {activeTab === "estoques" && (
                <>
                  <input
                    type="number"
                    placeholder="Quantidade em Estoque"
                    value={formData.quantidadeEstoque}
                    onChange={(e) => setFormData({ ...formData, quantidadeEstoque: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                  <input
                    placeholder="Disponibilidade"
                    value={formData.disponibilidadeEstoque}
                    onChange={(e) => setFormData({ ...formData, disponibilidadeEstoque: e.target.value })}
                    className="w-full border p-3 rounded-lg"
                  />
                </>
              )}

            </div>

            {/* BOTÕES DO MODAL */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetForm} className="px-4 py-2 border rounded-lg">
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (activeTab === "produtos") {
                    editingProduct ? handleUpdateProduct() : handleCreateProduct();
                  } else if (activeTab === "categorias") {
                    editingProduct ? handleUpdateCategory() : handleCreateCategory();
                  } else if (activeTab === "estoques") {
                    editingProduct ? handleUpdateStock() : handleCreateStock();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingProduct ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
