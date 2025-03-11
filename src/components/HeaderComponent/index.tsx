import React from "react";
import { ShoppingCart } from "lucide-react";

const HeaderComponent: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-lg rounded-b-lg">
      <h1 className="text-2xl font-bold tracking-wide">My Shop</h1>

      <div className="relative flex items-center">
        <ShoppingCart className="w-7 h-7 cursor-pointer hover:text-gray-300 transition duration-300" />

        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md">
          5
        </span>
      </div>
    </header>
  );
};

export default HeaderComponent;
