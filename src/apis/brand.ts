import axiosClient from "../utils/axiosClient";

export const brandApis = {
  getAllBrands: async () => {
    const response = await axiosClient.get("/brands");
    return response.data;
  },
};
