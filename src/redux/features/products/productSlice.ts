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
  filtersParams: Record<string, string | number | Array<string | number>>;
  sortOption: string;
}

const initialState: IState = {
  productList: [],
  loading: false,
  sortOption: "1",
  filtersParams: {
    _sort: "productPrice",
    _order: "asc",
  },
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (params: Record<string, any> | undefined) => {
    const productList = productApi.getAllProduct(params);
    return productList;
  }
);

export const actChangeSortOption = createAsyncThunk(
  "product/actChangeSortOption",
  (payload: string, thunkApi) => {
    thunkApi.dispatch(setSortOption(payload));
    let _filtersProduct = {};

    switch (payload) {
      case "1":
        _filtersProduct = {
          _sort: "productPrice",
          _order: "asc",
        };
        break;

      case "2":
        _filtersProduct = {
          _sort: "productPrice",
          _order: "desc",
        };
        break;

      case "3":
        _filtersProduct = {
          _sort: "productName",
          _order: "asc",
        };
        break;

      case "4":
        _filtersProduct = {
          _sort: "productName",
          _order: "desc",
        };
        break;

      default:
        break;
    }

    thunkApi.dispatch(setFiltersParams(_filtersProduct));
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setFiltersParams: (
      state: IState,
      action: PayloadAction<
        Record<string, string | number | Array<string | number>>
      >
    ) => {
      state.filtersParams = { ...state.filtersParams, ...action.payload };
    },
    setSortOption: (state: IState, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllProducts.fulfilled,
      (state: IState, action: PayloadAction<IProduct[]>) => {
        state.productList = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchAllProducts.rejected, (state: IState) => {
      toast.error("Has error when get products");
      state.loading = false;
    });
    builder.addCase(fetchAllProducts.pending, (state: IState) => {
      state.loading = true;
    });
  },
});

export const productReducer = productSlice.reducer;
export const { setFiltersParams, setSortOption } = productSlice.actions;
