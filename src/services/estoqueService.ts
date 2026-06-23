import { api } from "./api";

export const estoqueService = {
  async findAll() {
    const response = await api.get("/estoque");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get(`/estoque/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await api.post("/estoque", data);
    return response.data;
  },

  async update(id: number, data: any) {
    const response = await api.patch(`/estoque/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/estoque/${id}`);
    return response.data;
  },
};