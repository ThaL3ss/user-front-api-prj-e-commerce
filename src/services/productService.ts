import { api } from "./api";

export const productService = {
  async findAll() {
    const response = await api.get("/produto");

    return response.data;
  },

  async findById(id: string) {
    const response = await api.get(`/produto/${id}`);

    return response.data;
  },

  async create(data: {
    nomeProduto: string;
    precoProduto: number;
    categoriaId: number;
    estoqueId: number;
  }) {
    const response = await api.post("/produto", data);

    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/produto/${id}`);

    return response.data;
  },

  async update(
    id: number,
    data: {
      nomeProduto: string;
      precoProduto: number;
      categoriaId: number;
      estoqueId: number;
    }
  ) {
    const response = await api.patch(
      `/produto/${id}`,
      data
    );

    return response.data;
  },
};