import React, { ChangeEvent } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { actChangeSortOption } from "../../redux/features/products/productSlice";

const SortSection: React.FC = () => {
  const sortOption = useAppSelector((state) => state.productReducer.sortOption);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(actChangeSortOption(value));
  };

  return (
    <div className="flex justify-end mb-4">
      <div>
        <label className="mr-2">Sort by:</label>
        <select
          className="border p-1 rounded"
          value={sortOption}
          onChange={handleChangeSortBy}
        >
          <option value={"1"}>Price: Low to High</option>
          <option value={"2"}>Price: High to Low</option>
          <option value={"3"}>Name: A - Z</option>
          <option value={"4"}>Name: Z - A</option>
        </select>
      </div>
    </div>
  );
};

export default SortSection;
