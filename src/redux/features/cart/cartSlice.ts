import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/productSlice";
import { toast } from "react-toastify";

interface ICartQuantity {
  quantity: number;
}

export interface ICart extends IProduct, ICartQuantity {}

interface ICartState {
  cart: Array<ICart>;
}

const initialState: ICartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (
      state: ICartState,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const existedProductIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.product.id
      );
      if (existedProductIndex !== -1) {
        const cartClone = [...state.cart];
        cartClone[existedProductIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
        });
      }

      toast.success("Add product to cart success");
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQuantityToCart: (
      state: ICartState,
      action: PayloadAction<{ productCart: ICart; quantity: number }>
    ) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload.productCart.id) {
          if (action.payload.quantity <= 0) {
            return { ...product };
          }
          return { ...product, quantity: action.payload.quantity };
        }

        return { ...product };
      });

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (
      state: ICartState,
      action: PayloadAction<{ productId: string | number }>
    ) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.productId
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    checkout: (state: ICartState) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, updateQuantityToCart, removeProduct, checkout } =
  cartSlice.actions;
