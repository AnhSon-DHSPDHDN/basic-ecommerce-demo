import React, { useEffect, useState } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import { useParams } from "react-router";
import { IProduct } from "../../redux/features/products/productSlice";
import { toast } from "react-toastify";
import { productApi } from "../../apis/product";

const ProductDetailPage: React.FC = () => {
  const [productData, setProductData] = useState<IProduct | undefined>(
    undefined
  );
  const params = useParams();
  const productId = params.id;

  const handleFetchProductInfo = async () => {
    try {
      if (!productId) {
        throw new Error();
      }
      const data = await productApi.getProductById(productId);
      console.log(data, "asd");
      setProductData(data);
    } catch {
      toast("Get product info fail");
    }
  };

  useEffect(() => {
    handleFetchProductInfo();
  }, [productId]);

  return (
    <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
      {/* Product Image */}
      <div className="bg-gray-200 h-96 rounded-lg">
        <img
          className="h-96 w-full object-cover"
          src={productData?.productThumbnail}
          alt={productData?.productName}
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{productData?.productName}</h1>
        <p className="text-gray-600 text-xl mb-4">
          ${productData?.productPrice}
        </p>
        <p className="text-gray-700 mb-6">{productData?.productDescription}</p>

        {/* Quantity Input */}
        <div className="flex items-center mb-4">
          <label className="mr-2 text-lg">Quantity:</label>
          <input
            type="number"
            min="1"
            className="border p-2 w-16 text-center rounded"
          />
        </div>

        <button className="bg-blue-500 text-white py-2 px-6 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-300">
          Add to Cart
        </button>
      </div>

      <RelatedProducts />
    </div>
  );
};

export default ProductDetailPage;
