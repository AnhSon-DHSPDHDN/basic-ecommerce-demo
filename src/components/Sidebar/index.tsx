import React, { ChangeEvent, useEffect } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { fetchAllBrands } from "../../redux/features/brands/brandSlice";
import {
  actChangeFilterBrand,
  actChangeFilterPrice,
  clearAllFilter,
} from "../../redux/features/products/productSlice";
import { useSearchParams } from "react-router";

const Sidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brands = useAppSelector((state) => state.brandReducer.brands);
  const filterByBrands = useAppSelector(
    (state) => state.productReducer.filterByBrands
  );
  const filterPrice = useAppSelector(
    (state) => state.productReducer.filterPrice
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeBrands = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newFilterBrands = new Set([...filterByBrands]);
    if (newFilterBrands.has(value)) {
      newFilterBrands.delete(value);
    } else {
      newFilterBrands.add(value);
    }

    const newFilterBrandsArray = Array.from(newFilterBrands);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("brandId", newFilterBrandsArray.join(","));
    setSearchParams(newSearchParams);
    dispatch(actChangeFilterBrand(newFilterBrandsArray));
  };

  const handleChangeFilterPrice = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("price", value);
    setSearchParams(newSearchParams);
    dispatch(actChangeFilterPrice(value));
  };

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, []);

  const handleClearFilter = () => {
    setSearchParams({});
    dispatch(clearAllFilter());
  };

  return (
    <aside className="col-span-1 self-start bg-white shadow-lg p-4 rounded-lg sticky top-0 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filter by Brand</h2>
      <ul className="space-y-2 mb-4">
        {brands.map((brand) => (
          <li key={brand.id}>
            <input
              type="checkbox"
              id={`${brand.id}`}
              value={brand.id}
              onChange={handleChangeBrands}
              checked={filterByBrands.includes(`${brand.id}`)}
            />{" "}
            <label htmlFor={`${brand.id}`}>{brand.brandName}</label>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Price Range</h2>
      <select
        className="w-full border p-2 rounded cursor-pointer"
        value={filterPrice}
        onChange={handleChangeFilterPrice}
      >
        <option value="">Select Price Range</option>
        <option value="<200">&lt; $200</option>
        <option value="200-500">$200 - $500</option>
        <option value="500-1000">$500 - $1000</option>
        <option value=">1000">&gt; $1000</option>
      </select>

      <div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center"
          onClick={handleClearFilter}
        >
          Clear filter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
