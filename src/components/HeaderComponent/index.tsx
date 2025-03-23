import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { clearAllFilter } from "../../redux/features/products/productSlice";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigateToCartPage = () => {
    navigate("/cart");
  };

  const handleClearFilter = () => {
    dispatch(clearAllFilter());
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 flex justify-between items-center shadow-lg rounded-b-lg">
      <Link
        className="text-2xl font-bold tracking-wide"
        to={"/home"}
        onClick={handleClearFilter}
      >
        My Shop
      </Link>

      <div
        className="relative flex items-center"
        onClick={handleNavigateToCartPage}
      >
        <ShoppingCart className="w-7 h-7 cursor-pointer hover:text-gray-300 transition duration-300" />

        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-md">
          5
        </span>
      </div>
    </header>
  );
};

export default HeaderComponent;
