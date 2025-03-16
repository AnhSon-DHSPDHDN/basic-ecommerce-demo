import React from "react";

interface IProps {
  productName: string;
  productPrice: number;
  productThumbnail: string;
}

const ProductCard: React.FC<IProps> = ({
  productName,
  productPrice,
  productThumbnail,
}) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-2xl">
      <div className="bg-gray-200 h-40 w-40 mb-4">
        <img
          className="h-40 w-40 object-cover"
          src={productThumbnail}
          alt={productName}
        />
      </div>
      <h3
        className="text-lg font-semibold transition-colors
      duration-300 hover:text-blue-500 cursor-pointer"
      >
        {productName}
      </h3>
      <p className="text-gray-600">${productPrice}</p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
