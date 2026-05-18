 import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {getProductsAsync } from "../features/products/ProductSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLogin } from "../features/auth/LoginSlice";
import { clearSignup } from "../features/auth/SignupSlice";

const Navbar = () => {

  // 🔹 Get authentication data from Redux store
  const { authSignup } = useSelector((state) => state.authSignup);
  const { authLogin } = useSelector((state) => state.authLogin);

  // 🔹 Get cart items count
  const { carts } = useSelector((state) => state.carts);

  // 🔹 Get products and categories from Redux store
  const { products } = useSelector((state) => state.products);

  // 🔹 Local state for search input
  const [search, setSearch] = useState("");

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Fetch products whenever search or category changes
  useEffect(() => {
    dispatch(
      getProductsAsync({
        search: search,
        pagination: 1,
      })
    );
  }, [dispatch, search]);

 

  // 🔹 Handle user logout (clear Redux + local storage)
  const handleLogoutbtn = async () => {
    try {
      dispatch(clearLogin());
      dispatch(clearSignup());
      await persistor.purge();
    } catch (error) {
      console.log("handle logout error", error);
    }
  };

  // 🔹 Get logged-in user (login OR signup)
  const user = authLogin || authSignup;

  return (
    <>
      {/* 🔹 Show navbar only on specific routes */}
      {(location.pathname === "/" || location.pathname === "/productDetails") && (

        <nav className="sticky top-0 z-50 bg-[#4c8373] border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

            {/* 🔹 Logo */}
            <h1
              className="text-xl font-semibold text-white cursor-pointer hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              ShopX
            </h1>

            {/* 🔹 Search + Category Filter */}
            <div className="flex items-center gap-3 flex-1 max-w-xl">

              {/* Search Input */}
              <div className="flex items-center w-full bg-gray-100 border rounded-md px-3 py-2 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-gray-300 transition">
                <FiSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none px-2 w-full text-gray-700"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* 🔹 Right Side Actions */}
            <div className="flex items-center gap-3">

              {/* 🛒 Cart Icon with count */}
              <div className="relative cursor-pointer p-2 rounded-md mr-10 hover:bg-gray-200 transition transform hover:scale-105">
                <FiShoppingCart
                  className="text-black text-3xl"
                  onClick={() => navigate("/cart")}
                />
                <span className="absolute -top-1 -right-1 text-xs bg-red-600 font-semibold text-white px-1.5 rounded-full">
                  {carts.length}
                </span>
              </div>

              {/* 🔹 Auth Section (Login / User Info) */}
              {user ? (
                <div className="flex items-center gap-4 p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">

                  {/* User Avatar */}
                  <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold uppercase">
                    {user.name && user.name[0]}
                  </div>

                  {/* User Name */}
                  <span className="text-white font-medium text-sm">
                    {user.name?.toUpperCase() || "USER"}
                  </span>

                  {/* Logout Button */}
                  <button
                    className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-red-700 transition"
                    onClick={handleLogoutbtn}
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">

                  {/* Login Button */}
                  <button
                    className="px-3 py-1.5 rounded-md text-sm border text-white border-white hover:bg-white hover:text-[#4c8373] transition"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>

                  {/* Signup Button */}
                  <button
                    className="px-3 py-1.5 rounded-md text-sm bg-black text-white hover:bg-gray-800 transition"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>

                </div>
              )}

              {/* 🔹 Orders Button */}
              <div className="p-2 rounded-md border-2 border-green-500 bg-green-500/50 hover:scale-105 transition text-white">
                <button
                  className="font-semibold uppercase"
                  onClick={() => navigate("/orderHistory")}
                >
                  Orders
                </button>
              </div>

            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;