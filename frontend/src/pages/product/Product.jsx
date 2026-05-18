 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAsync } from '../../features/products/ProductSlice';
import ProductCart from './ProductCart';

const Product = () => {

  const dispatch = useDispatch();

  // Extracting product related state from Redux store
  const { products, loading, totalPages, currentPage, LocalSearch } =
    useSelector((state) => state.products);

   const [pagination, setPagination] = useState(1);

  useEffect(() => {
    dispatch(getProductsAsync({
      search: LocalSearch,
       pagination
    }));

  }, [dispatch, pagination, LocalSearch]);

  return (
    // Main container with background gradient styling
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-6">

      {/* Page heading */}
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        🛍️ Our Products
      </h1>

      {/* -------------------- LOADING STATE -------------------- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">

          {/* Loading spinner */}
          <div className="w-16 h-16 border-4 border-t-purple-500 border-gray-600 rounded-full animate-spin"></div>

          {/* Loading text */}
          <p className="text-white mt-4 font-medium animate-pulse">
            Loading Products...
          </p>

        </div>
      ) : (
        <>
          {products && products.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">

              <div className="text-6xl mb-4">🔍</div>

              <h2 className="text-2xl font-semibold text-white">
                No Products Found
              </h2>

              <p className="text-gray-400 mt-2">
                Try adjusting your search or category filter.
              </p>

            </div>
          ) : (
            // -------------------- PRODUCTS GRID --------------------
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {products?.map((item) => (
                <ProductCart
                  key={item?.id || item?._id}
                  data={item}
                />
              ))}

            </div>
          )}
        </>
      )}

      {/* -------------------- PAGINATION CONTROLS -------------------- */}
      {!loading && products && products.length > 0 && (
        <div className="flex flex-col items-center mt-10 gap-3">

           <span className="text-gray-300 text-sm">
            Page <span className="text-white font-semibold">{currentPage}</span>
            {" "}to{" "}
            <span className="text-white font-semibold">{totalPages}</span>
          </span>

           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl shadow-lg">

             <button
              disabled={currentPage === 1}
              onClick={() => setPagination(currentPage - 1)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95"
              }`}
            >
              ⬅
            </button>

            {/* Current page indicator */}
            <div className="px-4 py-1.5 rounded-lg bg-white text-black font-semibold shadow-md">
              {currentPage}
            </div>

            {/* Next page button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPagination(currentPage + 1)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 active:scale-95"
              }`}
            >
              ➡
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default Product