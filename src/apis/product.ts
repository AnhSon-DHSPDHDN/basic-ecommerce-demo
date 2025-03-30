import axiosClient from "../utils/axiosClient";

export const productApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllProduct: async (params: Record<string, any> = {}) => {
    const response = await axiosClient.get("/products", {
      params: params,
    });
    return response.data;
  },
  getProductById: async (productId: string | number) => {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data;
  },
};
