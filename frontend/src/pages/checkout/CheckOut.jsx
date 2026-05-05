 import React from 'react'
import { useSelector } from 'react-redux'
import CheckOutItems from './CheckOutItems'
import Address from './Address'

const CheckOut = () => {
  // Extracting cart items from Redux store
  const { carts } = useSelector((state) => state.carts);

  // Financial calculations: Subtotal, 18% GST, and Final Amount
  const total = carts.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
  const textPaid = total * 0.18;
  const totalAmount = total + textPaid;

  return (
    // Main container with light grey background as requested
    <div className="min-h-screen bg-[#acaeb4] flex flex-col overflow-hidden font-sans">

      {/* 🔽 Main Grid Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 py-8 overflow-hidden">

        {/* 💳 LEFT COLUMN - Shipping Address (Stays Sticky at the Top) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-5">
            <Address />
          </div>
        </div>

        {/* 🛒 RIGHT COLUMN - Review Section (Fixed Height for Scroll & Bottom Bar) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-[calc(100vh-80px)] justify-between">
          
          {/* Header & Scrollable List Container */}
          <div className="flex flex-col bg-[#a6b9be] flex-1 overflow-hidden">
            <div className="mb-4 shrink-0">
               <h2 className="font-black tracking-tight text-gray-700 uppercase text-xl">Review Your Order</h2>
               <div className="h-0.75 w-10 bg-blue-600 mt-1 rounded-full"></div>
            </div>

            {/* Scrollable Products List - Covers available space and pushes summary down */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-4 custom-scrollbar">
              {carts.length > 0 ? (
                carts.map((item) => (
                  <div 
                    key={item._id} 
                    className="group bg-[#161b22] p-1 rounded-[30px] border border-white/5 transition-all duration-500 hover:border-blue-500/20"
                  >
                    <div className="bg-[#0b0f1a] rounded-[26px] p-5">
                      <CheckOutItems checkListData={item} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-400/30 rounded-[40px]">
                  <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Your bag is empty</p>
                </div>
              )}
              {/* Bottom padding for scroll breathing room */}
              <div className="h-6"></div>
            </div>
          </div>

          {/* 💰 STICKY BOTTOM SUMMARY BAR - Pushed to the very bottom */}
          <div className="mt-4 shrink-0 bg-[#161b22] backdrop-blur-2xl border border-white/10 p-6 rounded-[35px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Visual glow element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px]" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
              
              {/* Items Counter Info */}
              <div className="flex items-center gap-4 order-2 sm:order-1">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <span className="font-black text-xl text-blue-400">{carts.length}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Items</span>
                  <span className="text-sm font-black text-white uppercase tracking-tighter">In Your Checkout</span>
                </div>
              </div>

              {/* Total Payable (Now perfectly anchored to bottom) */}
              <div className="flex flex-col items-center sm:items-end order-1 sm:order-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.25em] mb-1">Final Amount</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-500">₹</span>
                   <h2 className="text-4xl font-black tracking-tighter bg-linear-to-r from-white to-amber-400 bg-clip-text text-transparent">
                    {totalAmount.toFixed(2)}
                  </h2>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckOut;