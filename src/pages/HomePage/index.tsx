import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import SortSection from "../../components/SortSection";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import {
  fetchAllProducts,
  IProduct,
  loadMoreProducts,
} from "../../redux/features/products/productSlice";
import { AppDispatch, useAppSelector } from "../../redux/store/store";

const HomePage: React.FC = () => {
  const pagination = useAppSelector((state) => state.productReducer.pagination);
  const maximumProductCount = pagination.limit * pagination.curPage;
  const products: IProduct[] = useAppSelector(
    (state) => state.productReducer.productList
  );
  const isLoading: boolean = useAppSelector(
    (state) => state.productReducer.loading
  );
  const filtersProductParams = useAppSelector(
    (state) => state.productReducer.filtersParams
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (pagination.curPage !== filtersProductParams._page) {
      dispatch(
        fetchAllProducts({
          ...filtersProductParams,
          _limit: pagination.curPage * pagination.limit,
        })
      );
    } else {
      dispatch(fetchAllProducts(filtersProductParams));
    }
  }, [filtersProductParams]);

  const handleLoadMoreProduct = () => {
    dispatch(
      loadMoreProducts({
        ...filtersProductParams,
        _page: pagination.curPage + 1,
      })
    );
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-4 gap-6">
      <Sidebar />

      {/* Main Content */}
      <main className="col-span-3">
        <SortSection />

        {/* Product List */}
        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            <div>Loading . . . </div>
          ) : (
            products.map((productItem) => (
              <ProductCard product={productItem} key={productItem.id} />
            ))
          )}
        </div>

        {/* Load More Button */}
        {products.length >= maximumProductCount && (
          <div className="mt-6 text-center">
            <button
              className="bg-gray-800 text-white py-2 px-6 rounded
          cursor-pointer hover:bg-gray-900 transition-colors duration-300"
              onClick={handleLoadMoreProduct}
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
