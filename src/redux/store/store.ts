import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/productSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { brandReducer } from "../features/brands/brandSlice";
import { cartReducer } from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    productReducer,
    brandReducer,
    cartReducer,
  }, // import others reducers in next time
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
