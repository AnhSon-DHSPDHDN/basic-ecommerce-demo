import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/productSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    productReducer,
  }, // import others reducers in next time
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
