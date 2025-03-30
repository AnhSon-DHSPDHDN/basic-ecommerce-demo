import React, { ChangeEvent } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import {
  ICart,
  removeProduct,
  updateQuantityToCart,
} from "../../redux/features/cart/cartSlice";

const CartPage: React.FC = () => {
  const carts = useAppSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch<AppDispatch>();

  const computedTotalMoney = () => {
    const total = carts.reduce((total, product) => {
      return total + product.quantity * product.productPrice;
    }, 0);
    return total;
  };

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    productCart: ICart
  ) => {
    const value = Number(event.target.value);
    dispatch(
      updateQuantityToCart({ productCart: productCart, quantity: value })
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {carts.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {carts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {product.productName}
                    </h2>
                    <p className="text-gray-600">{product.productPrice}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      className="border p-2 w-16 text-center rounded mr-4"
                      value={product.quantity}
                      onChange={(e) => handleChangeQuantity(e, product)}
                    />
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors"
                      onClick={() =>
                        dispatch(removeProduct({ productId: product.id }))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <h2 className="text-xl font-semibold">
                Total: ${computedTotalMoney()}
              </h2>
              <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
