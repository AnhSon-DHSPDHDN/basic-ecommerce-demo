import React from "react";
import ProductCard from "../ProductCard";
import { IProduct } from "../../redux/features/products/productSlice";

type IProps = {
  relatedProducts: IProduct[];
};

const RelatedProducts: React.FC<IProps> = ({ relatedProducts }) => {
  return (
    <div className="col-span-2 mt-12">
      <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
