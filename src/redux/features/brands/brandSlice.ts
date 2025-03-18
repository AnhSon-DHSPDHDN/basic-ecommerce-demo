import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { brandApis } from "../../../apis/brand";
import { toast } from "react-toastify";

export type TBrand = {
  id: string | number;
  brandName: string;
};

type TBrandState = {
  brands: Array<TBrand>;
};

const initialState: TBrandState = {
  brands: [],
};

export const fetchAllBrands = createAsyncThunk(
  "brands/fetchAllBrands",
  async () => {
    const data = await brandApis.getAllBrands();
    return data;
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllBrands.fulfilled,
      (state: TBrandState, action: PayloadAction<Array<TBrand>>) => {
        state.brands = action.payload;
      }
    );
    builder.addCase(fetchAllBrands.rejected, () => {
      toast.error("Has error when get brands");
    });
  },
});

export const brandReducer = brandSlice.reducer;
