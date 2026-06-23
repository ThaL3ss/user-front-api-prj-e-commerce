import { api } from "./api";

export const categoriaService = {
  async findAll() {
    const response = await api.get("/categorias");
    return response.data;
  },

  async findById(id: string) {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  async create(data: any) {
    const response = await api.post("/categorias", data);
    return response.data;
  },

  async update(id: number, data: any) {
    const response = await api.patch(`/categorias/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  },
};