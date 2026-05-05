 import React from 'react';
import { useSelector } from 'react-redux';

const OrderList = ({ orderData }) => {
  
  return (
    // Main Container: Using a deep dark background to match the premium theme
    // Added responsive padding and smooth hover scaling effects
    <div className="bg-[#161b22]/40 backdrop-blur-sm border border-white/5 p-4 sm:p-6 mb-4 rounded-2 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] group">
      
      {/* 🧾 Order Header: Contains Order ID and Payment Status Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-5 gap-3">
        <div className="flex flex-col">
          <span className="text-gray-500 font-mono text-[10px] tracking-[0.2em] uppercase">
            Transaction ID
          </span>
          <span className="font-bold text-white text-base sm:text-lg tracking-tight">
            #{orderData._id.slice(-12).toUpperCase()}
          </span>
        </div>
        
        {/* Status Badge: Dynamic colors based on payment status */}
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-500 ${
          orderData.paymentStatus === 'success' 
          ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]' 
          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          {orderData.paymentStatus}
        </span>
      </div>

      {/* 📦 Products Section: Mapping through all items in the order */}
      <div className="space-y-5">
        {orderData.products && orderData.products.map((p) => (
          <div key={p._id} className="flex gap-4 items-center group/item transition-all">
            
            {/* Product Thumbnail with hover zoom effect */}
            <div className="relative overflow-hidden rounded-xl border border-white/5 shrink-0">
              <img 
                src={p.productId?.thumbnail} 
                alt={p.productId?.title} 
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover transition-transform duration-500 group-hover/item:scale-110"
              />
            </div>
            
            {/* Product Metadata */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-200 truncate text-sm sm:text-base tracking-tight">
                {p.productId?.title}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                  Qty: <span className="text-gray-300">{p.quantity}</span>
                </p>
                <span className="h-3 w-1px bg-white/10"></span>
                <span className="text-[10px] text-blue-400/80 font-bold uppercase tracking-tighter">
                  {p.productId?.category}
                </span>
              </div>
            </div>

            {/* Individual Item Pricing */}
            <div className="text-right">
              <p className="font-bold text-white text-sm sm:text-base">
                ₹{p.productId?.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 Footer Section: Order Date and Total Summary */}
      <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-5">
        
        {/* Placement Date */}
        <div className="flex flex-col items-start font-mono order-2 sm:order-1">
          <span className="text-[9px] text-gray-600 font-bold tracking-[0.2em] uppercase">Placed On</span>
          <span className="text-gray-400 text-xs mt-0.5">
            {new Date(orderData.createdAt).toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
        </div>
        
        {/* Total Summary: Large typography for the final amount */}
        <div className="flex flex-col items-end order-1 sm:order-2 w-full sm:w-auto">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mb-1">Grand Total</span>
          <p className="text-2xl sm:text-3xl font-black tracking-tighter bg-linear-to-br from-white to-gray-500 bg-clip-text text-transparent">
            ₹{orderData?.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;