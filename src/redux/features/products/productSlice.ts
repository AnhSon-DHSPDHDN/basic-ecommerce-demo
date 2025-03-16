import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../../../apis/product";
import { toast } from "react-toastify";

export interface IProduct {
  id: string | number;
  productName: string;
  brandId: string | number;
  productPrice: number;
  productThumbnail: string;
  productDescription: string;
}

interface IState {
  productList: IProduct[];
  loading: boolean;
}

const initialState: IState = {
  productList: [],
  loading: false,
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (params: Record<string, any> | undefined) => {
    const productList = productApi.getAllProduct(params);
    return productList;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state: IState, action: PayloadAction<IProduct[]>) => {
        state.productList = action.payload;
      }
    );
    builder.addCase(fetchAllProducts.rejected, () => {
      toast.error("Has error when get products");
    });
  },
});

export const productReducer = productSlice.reducer;
