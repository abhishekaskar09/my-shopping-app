 import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartAsync } from "../../features/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";

const SingleProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useSelector((state) => state.authLogin);
  const { products } = useSelector((state) => state.products);

  const product = products?.find((p) => p._id === id);

  const [success, setSuccess] = useState(false);

  const handleAddProduct = async () => {
    try {
      if (!token) return navigate("/login");
      if (!product) return;

      await dispatch(
        createCartAsync({
          productId: product._id,
          quantity: 1,
        })
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-black">
        Loading Product...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-black p-6">

      {/* CARD */}
      <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-10 p-8 rounded-4xl
        bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden group">

        {/* Glow background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
          <div className="absolute -inset-40 bg-linear-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl"></div>
        </div>

        {/* IMAGE */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-90 object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-md border border-white/20">
            ⭐ {product.rating}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between text-white">

          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {product.title}
            </h1>

            <p className="text-gray-300 mt-4 leading-relaxed">
              {product.description}
            </p>

            <span className="inline-block mt-5 px-4 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-purple-300">
              {product.category}
            </span>
          </div>

          {/* PRICE + BUTTON */}
          <div className="mt-8 space-y-4">

            <div className="text-4xl font-black text-green-400">
              ₹{product.price}
            </div>

            <button
              onClick={handleAddProduct}
              disabled={success}
              className={`
                relative w-full py-3 rounded-xl font-semibold text-sm tracking-wide
                transition-all duration-300 overflow-hidden

                ${
                  success
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-linear-to-r from-emerald-500 via-green-500 to-lime-500 text-white shadow-lg hover:scale-[1.03] active:scale-95 hover:shadow-green-400/30"
                }

                disabled:opacity-70
              `}
            >
              {success ? "Added ✓" : "Add to Cart"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleProductDetail;