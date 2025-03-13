import React from "react";
import Sidebar from "../../components/Sidebar";
import SortSection from "../../components/SortSection";
import ProductCard from "../../components/ProductCard";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-4 gap-6">
      <Sidebar />

      {/* Main Content */}
      <main className="col-span-3">
        <SortSection />

        {/* Product List */}
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ProductCard
              productName={`Product ${index + 1}`}
              productPrice={99.99}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-6 text-center">
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded
          cursor-pointer hover:bg-gray-900 transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
