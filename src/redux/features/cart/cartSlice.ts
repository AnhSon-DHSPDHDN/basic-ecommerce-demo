import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/productSlice";

interface ICartQuantity {
  quantity: number;
}

export interface ICart extends IProduct, ICartQuantity {}

interface ICartState {
  cart: Array<ICart>;
}

const initialState: ICartState = {
  cart: [],
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
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, updateQuantityToCart } = cartSlice.actions;
