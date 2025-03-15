import React from "react";
import ProductCard from "../ProductCard";

const RelatedProducts: React.FC = () => {
  return (
    <div className="col-span-2 mt-12">
      <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <ProductCard
            productName={`Product ${index + 1}`}
            productPrice={99.99}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
