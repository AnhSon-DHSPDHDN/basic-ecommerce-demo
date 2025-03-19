import React, { useEffect } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { fetchAllBrands } from "../../redux/features/brands/brandSlice";

const Sidebar: React.FC = () => {
  const brands = useAppSelector((state) => state.brandReducer.brands);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, []);

  return (
    <aside className="col-span-1 self-start bg-white shadow-lg p-4 rounded-lg sticky top-0 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filter by Brand</h2>
      <ul className="space-y-2 mb-4">
        {brands.map((brand) => (
          <li key={brand.id}>
            <input type="checkbox" id={`${brand.id}`} value={brand.id} />{" "}
            <label htmlFor={`${brand.id}`}>{brand.brandName}</label>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Price Range</h2>
      <select className="w-full border p-2 rounded cursor-pointer">
        <option value="">Select Price Range</option>
        <option value="<200">&lt; $200</option>
        <option value="200-500">$200 - $500</option>
        <option value="500-1000">$500 - $1000</option>
        <option value=">1000">&gt; $1000</option>
      </select>
    </aside>
  );
};

export default Sidebar;
