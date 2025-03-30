import React from "react";
import { IProduct } from "../../redux/features/products/productSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    dispatch(addToCart({ product: product, quantity: 1 }));
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-2xl">
      <div className="bg-gray-200 h-40 w-40 mb-4">
        <img
          className="h-40 w-40 object-cover"
          src={product?.productThumbnail}
          alt={product?.productName}
        />
      </div>
      <h3
        className="text-lg font-semibold transition-colors
      duration-300 hover:text-blue-500 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product?.productName}
      </h3>
      <p className="text-gray-600">${product?.productPrice}</p>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-300"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
