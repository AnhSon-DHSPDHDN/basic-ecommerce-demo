import React, { useEffect, useState } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import { useParams } from "react-router";
import { IProduct } from "../../redux/features/products/productSlice";
import { toast } from "react-toastify";
import { productApi } from "../../apis/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetailPage: React.FC = () => {
  const [relatedProducts, setRelatedProduct] = useState<IProduct[]>([]);
  const [inputQuantity, setInputQuantity] = useState<string>("1");
  const dispatch = useDispatch<AppDispatch>();
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
      setProductData(data);
    } catch {
      toast("Get product info fail");
    }
  };

  const handleFetchRelatedProduct = async () => {
    try {
      const data = await productApi.getAllProduct({
        brandId: productData?.brandId,
        _limit: 4,
      });
      console.log(data, "related product");
      setRelatedProduct(data);
    } catch {
      toast.error("Fetch related product fail");
    }
  };

  useEffect(() => {
    handleFetchProductInfo();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      handleFetchRelatedProduct();
    }
  }, [productData]);

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
            value={inputQuantity}
            onChange={(e) => {
              const value = e.target.value;
              setInputQuantity((prevQuantity) => {
                if (Number(value) <= 0) {
                  return prevQuantity;
                }
                return value;
              });
            }}
          />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-6 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          onClick={() =>
            dispatch(
              addToCart({
                product: productData as IProduct,
                quantity: Number(inputQuantity),
              })
            )
          }
        >
          Add to Cart
        </button>
      </div>

      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
