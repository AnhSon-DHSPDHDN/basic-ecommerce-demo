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
  filterByBrands: Array<string | number>;
  filterPrice: string;
  pagination: {
    curPage: number;
    limit: number;
  };
}

const searchParams = new URLSearchParams(window.location.search);
const initFiltersParams = (): Record<
  string,
  string | number | Array<string | number>
> => {
  const sortOption = searchParams.get("sortOption") || "1";
  let filtersParams = {};

  switch (sortOption) {
    case "1":
      filtersParams = {
        _sort: "productPrice",
        _order: "asc",
      };
      break;

    case "2":
      filtersParams = {
        _sort: "productPrice",
        _order: "desc",
      };
      break;

    case "3":
      filtersParams = {
        _sort: "productName",
        _order: "asc",
      };
      break;

    case "4":
      filtersParams = {
        _sort: "productName",
        _order: "desc",
      };
      break;

    default:
      break;
  }

  // filter brands
  const filterBrands = searchParams.get("brandId")
    ? searchParams.get("brandId")!.split(",")
    : [];

  // filter price
  const filterPrice = searchParams.get("price") || "";
  let filterPriceParams = {};
  switch (filterPrice) {
    case "":
      filterPriceParams = {
        productPrice_lte: null,
        productPrice_gte: null,
      };
      break;

    case "<200":
      filterPriceParams = {
        productPrice_lte: 200,
        productPrice_gte: null,
      };
      break;

    case "200-500":
      filterPriceParams = {
        productPrice_lte: 500,
        productPrice_gte: 200,
      };
      break;

    case "500-1000":
      filterPriceParams = {
        productPrice_lte: 1000,
        productPrice_gte: 500,
      };
      break;

    case ">1000":
      filterPriceParams = {
        productPrice_gte: 1000,
        productPrice_lte: null,
      };
      break;

    default:
      break;
  }

  filtersParams = {
    ...filtersParams,
    brandId: filterBrands,
    ...filterPriceParams,
  };
  return filtersParams;
};

const initialState: IState = {
  productList: [],
  loading: false,
  sortOption: searchParams.get("sortOption") || "1",
  filtersParams: { ...initFiltersParams(), _page: 1, _limit: 6 },
  filterByBrands: searchParams.get("brandId")
    ? searchParams.get("brandId")!.split(",")
    : [],
  filterPrice: searchParams.get("price") || "",
  pagination: {
    curPage: 1,
    limit: 6,
  },
};

export const loadMoreProducts = createAsyncThunk(
  "product/loadMoreProducts",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (params: Record<string, any> | undefined) => {
    const productList = productApi.getAllProduct(params);
    return productList;
  }
);

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

export const actChangeFilterBrand = createAsyncThunk(
  "product/actChangeFilterBrand",
  (payload: Array<string | number>, thunkApi) => {
    thunkApi.dispatch(setFilterByBrands(payload));
    thunkApi.dispatch(setFiltersParams({ brandId: payload }));
  }
);

export const actChangeFilterPrice = createAsyncThunk(
  "product/actChangeFilterPrice",
  (payload: string, thunkApi) => {
    let filtersParams = {};
    switch (payload) {
      case "":
        filtersParams = {
          productPrice_lte: null,
          productPrice_gte: null,
        };
        break;

      case "<200":
        filtersParams = {
          productPrice_lte: 200,
          productPrice_gte: null,
        };
        break;

      case "200-500":
        filtersParams = {
          productPrice_lte: 500,
          productPrice_gte: 200,
        };
        break;

      case "500-1000":
        filtersParams = {
          productPrice_lte: 1000,
          productPrice_gte: 500,
        };
        break;

      case ">1000":
        filtersParams = {
          productPrice_gte: 1000,
          productPrice_lte: null,
        };
        break;

      default:
        break;
    }

    thunkApi.dispatch(setFiltersParams(filtersParams));
    thunkApi.dispatch(setFilterPrice(payload));
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
    setFilterByBrands: (
      state: IState,
      action: PayloadAction<Array<string | number>>
    ) => {
      state.filterByBrands = action.payload;
    },
    setFilterPrice: (state: IState, action: PayloadAction<string>) => {
      state.filterPrice = action.payload;
    },
    clearAllFilter: (state: IState) => {
      state.sortOption = "1";
      state.filterByBrands = [];
      state.filterPrice = "";
      state.filtersParams = {
        _page: 1,
        _limit: 6,
      };
    },
    resetPagination: (state: IState) => {
      state.pagination.curPage = 1;
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
    builder.addCase(loadMoreProducts.rejected, () => {
      toast.error("Has error when load more product");
    });
    builder.addCase(
      loadMoreProducts.fulfilled,
      (state: IState, action: PayloadAction<IProduct[]>) => {
        state.productList.push(...action.payload);
        state.pagination.curPage += 1;
      }
    );
  },
});

export const productReducer = productSlice.reducer;
export const {
  setFiltersParams,
  setSortOption,
  setFilterByBrands,
  setFilterPrice,
  clearAllFilter,
  resetPagination,
} = productSlice.actions;
