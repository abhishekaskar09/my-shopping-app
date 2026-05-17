 import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCartAsync, deleteCartAsync } from '../../features/cart/CartSlice'

const CartItems = ({ cartData }) => {
  const dispatch = useDispatch();

  // Local state to toggle delete confirmation UI (YES / NO buttons)
  const [itemDelete, setItemDelete] = useState(false)

  // -------------------- HANDLE QUANTITY CHANGE --------------------
   const handleQuantity = async (type) => {
    try {
       const change = type === 'Add' ? 1 : -1;
 
       if (type === 'Minus' && cartData.quantity <= 1) return;

       await dispatch(createCartAsync({
        productId: cartData.productId._id,
        quantity: change
      }));

    } catch (error) {
       console.log('error in cartItems.jsx', error);
    }
  }

  // -------------------- HANDLE ITEM DELETE --------------------
   const handleDelete = async () => {
    try {
       const response = await dispatch(deleteCartAsync(
        cartData.productId._id,
      ));
       setItemDelete(false);
    } catch (error) {
       console.log('error in delete function in cartItems.jsx', error);
    }
  }

  return (
    <div className="relative group flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.01] hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_20px_60px_-10px_rgba(168,85,247,0.3)] overflow-hidden">

       <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] group-hover:animate-pulse"></div>
      </div>

      {/* Product image section */}
      <div className="relative w-full md:w-36 h-36 shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-inner bg-black/10">
        <img
          src={cartData?.productId?.thumbnail}
          alt={cartData?.productId?.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Product details section */}
      <div className="flex-1 flex flex-col gap-4 w-full text-center md:text-left min-w-0">
        <h3 className="text-2xl font-black text-white truncate">
          {cartData?.productId?.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {cartData?.productId?.description}
        </p>

        {/* Price and category display */}
        <div className="flex items-center justify-between">
          <span className="text-green-400 text-xl font-bold">
            ₹{cartData?.productId?.price}
          </span>

          <span className="text-xs bg-purple-900 ml-8 px-5 py-1 rounded text-white">
            {cartData?.productId?.category}
          </span>
        </div>
      </div>

      {/* Delete confirmation UI (toggle based on state) */}
       <div className="flex flex-col items-center justify-center min-w-27.5 gap-2 z-10">

        {itemDelete ? (
          <div className="flex gap-2">

             <button
              className="px-3 py-1 border-2 active:scale-95 duration-300 border-red-600 bg-red-600/50 text-white rounded-md text-sm hover:scale-105 transition"
              onClick={handleDelete}>
              YES
            </button>

             <button
              className="px-3 py-1 border-2 border-green-600 bg-green-600/50 text-white rounded-md text-sm hover:scale-105 active:scale-95 duration-300 transition"
              onClick={() => setItemDelete(false)}
            >
              NO
            </button>
          </div>
        ) : (
           <button
            className="px-4 py-1.5 font-semibold border-2 active:scale-95 duration-300 border-red-600 bg-red-600/50 text-white rounded-md text-sm hover:scale-105 transition"
            onClick={() => setItemDelete(true)}
          >
            Delete
          </button>
        )}

      </div>

      {/* Quantity control section */}
       <div className="relative z-10 flex flex-col shrink-0 items-center gap-3 bg-black/30 p-4 rounded-3xl border border-white/5 min-w-35 shadow-inner">

        <div className="flex items-center gap-5">

          {/* Decrease quantity button */}
          <button
            onClick={() => handleQuantity('Minus')}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border text-white hover:bg-red-500/20 transition"
          >
            −
          </button>

          {/* Current product quantity */}
          <span className="text-2xl font-bold text-white">
            {cartData?.quantity}
          </span>

          {/* Increase quantity button */}
          <button
            onClick={() => handleQuantity('Add')}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border text-white hover:bg-green-500/20 transition"
          >
            +
          </button>
        </div>

      </div>

    </div>
  )
}

export default CartItems;