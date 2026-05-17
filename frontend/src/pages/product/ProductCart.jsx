 import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartAsync } from "../../features/cart/CartSlice";
import { useNavigate } from "react-router-dom";

const ProductCart = ({ data }) => {

  const dispatch = useDispatch();

  // Extracting authentication token from Redux store
  const { token } = useSelector((state) => state.authLogin);

  // Local state to show temporary success UI after adding product
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // -------------------- ADD PRODUCT TO CART --------------------
  const handleAddProduct = async () => {
    try {

      if (!token) {
        navigate("/login");
        return;
      }

       const res = await dispatch(
        createCartAsync({ productId: data._id, quantity: 1 })
      );

       setSuccess(true);

       setTimeout(() => {
        setSuccess(false);
      }, 1000);

    } catch (error) {
       console.log("error in productCart", error);
    }
  };

  return (
    // Product card container with hover effects
    <div className="relative group w-full max-w-300px rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500">

      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-green-500/20 via-emerald-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>

      {/* Product image section */}
      <div
        className="relative h-200px overflow-hidden"
        onClick={() => navigate(`/productDetails/${data?._id}`)}
      >
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Product rating badge */}
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
          ⭐ {data.rating}
        </div>
      </div>

      {/* Product details section */}
      <div className="relative p-4 text-gray-800">

        {/* Product title */}
        <h2 className="text-lg font-semibold line-clamp-1">
          {data.title}
        </h2>

        {/* Product description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {data.description}
        </p>

        {/* Category and price section */}
        <div className="flex justify-between items-center mt-3">

          {/* Category badge */}
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
            {data.category}
          </span>

          {/* Product price */}
          <span className="text-lg font-bold text-green-600">
            ₹{data.price}
          </span>

        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddProduct}
          disabled={success}
          className={`cursor-pointer mt-4 w-full py-2 rounded-lg font-medium transition-all duration-300
          ${
            success
              ? "bg-green-600 text-white"
              : "bg-linear-to-r from-green-500 to-emerald-500 text-white hover:scale-105 active:scale-95"
          }`}
        >
          {success ? "Added ✅" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
};

export default ProductCart;