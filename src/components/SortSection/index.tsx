import React from "react";

const SortSection: React.FC = () => {
  return (
    <div className="flex justify-end mb-4">
      <div>
        <label className="mr-2">Sort by:</label>
        <select className="border p-1 rounded">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>A - Z</option>
          <option>Z - A</option>
        </select>
      </div>
    </div>
  );
};

export default SortSection;
