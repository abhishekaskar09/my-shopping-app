 import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItems from './CartItems';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Access cart state from Redux store
  const { carts } = useSelector((state) => state.carts);

  // Calculate Subtotal, Tax (18% GST), and Total Amount
  const total = carts.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
  const textPaid = total * 0.18;
  const totalAmount = total + textPaid;

  // Local state for handling checkout loading/success animation
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  // Handle Checkout button click with simulated loading delay
  const handlecheckOutClick = async () => {
    try {
      setSuccess(true)  
      setTimeout(() => {
        setSuccess(false);
         if (carts.length === 0) {
          navigate('/')
        } else {
          navigate('/checkout')
        }
      }, 2000);
    } catch (error) {
      console.log('error in cart.jsx', error);
      setSuccess(false);
    }
  }

  return (
    // Main container with fixed height and hidden overflow to prevent body scrolling
    <div className="h-screen bg-[#bdc0c9] text-white flex flex-col overflow-hidden">

      {/* 🔝 Fixed Header Section (Always stays at the top) */}
      <div className="shrink-0 z-50 bg-[#0b0f1a]/60 backdrop-blur-xl border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
              SHOPPING BAG
            </h1>
          </div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">
            {carts.length} Items
          </p>
        </div>
      </div>

      {/* 🔽 Main Content Area - Split into Scrollable Items and Fixed Summary */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 py-6">

          {/* 🛒 LEFT SIDE - Scrollable Cart Items List */}
          <div className="lg:col-span-8 h-full overflow-y-auto pr-4 custom-scrollbar space-y-6">
            {carts.length > 0 ? (
              carts.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#161b22] border border-white/5 p-1 rounded-3xl transition-all duration-500 hover:border-blue-500/20"
                >
                  <div className="bg-[#0b0f1a] rounded-[22px] p-4">
                    <CartItems cartData={item} />
                  </div>
                </div>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/5">
                <p className="text-gray-500">Your bag is empty.</p>
              </div>
            )}
            {/* Spacer for clear visibility of the last item */}
            <div className="h-10"></div>
          </div>

          {/* 💳 RIGHT SIDE - Fixed Order Summary Section */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-[#161b22] border border-white/10 rounded-[35px] p-8 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Premium Glow Effect (Color changes on success state) */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 transition-all duration-1000 blur-[100px] opacity-20 ${success ? 'bg-cyan-400' : 'bg-blue-600'}`} />

              <h2 className="text-xl font-bold mb-8 relative z-10">Summary</h2>

              {/* Price Breakdown Details */}
              <div className="space-y-5 relative z-10">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>GST (18%)</span>
                  <span className="text-green-400">+ ₹{textPaid.toLocaleString()}</span>
                </div>
                <div className="h-1px bg-white/5 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-3xl font-black text-white">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* 🚀 Dynamic Checkout Button with Loading Spinner Support */}
              <button
                onClick={handlecheckOutClick}
                disabled={success}
                className={`relative w-full mt-10 py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden group
                ${success 
                  ? "bg-[#1da1f2]/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
                  : "bg-white text-black hover:bg-black/50 hover:text-white hover:backdrop-blur-xl border border-transparent hover:border-white/10 hover:scale-[1.02]"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {success ? (
                    <>
                      {/* Animated SVG Spinner for Processing State */}
                      <svg className="animate-spin h-5 w-5 text-green-400" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-green-400">Processing...</span>
                    </>
                  ) : "Checkout Now"}
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart;