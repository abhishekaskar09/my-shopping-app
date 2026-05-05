 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from './OrderList';
import { getCheckoutAsync } from '../../features/checkout/CheckOutSlice';

const OrderHistory = () => {

  // Extracting orders from Redux store
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
         await dispatch(getCheckoutAsync());
      } catch (error) {
         console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return (
    // Main container with full screen height and scroll handling
    <div className="h-screen bg-[#cdcdcd] text-white flex flex-col overflow-hidden font-sans">

      {/* Sticky header section for order history title */}
      <div className="shrink-0 z-50 bg-[#0b0f1a]/60 backdrop-blur-xl border-b border-white/5 px-1 py-1">
        <div className="max-w-6xl mx-auto flex justify-between items-end">

          {/* Page title and subtitle */}
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
              ORDER HISTORY
            </h1>
            <p className="text-black text-xs font-medium uppercase tracking-[0.2em] mt-1">
              Your previous purchases and status
            </p>
          </div>

          {/* Total orders counter */}
          <div className="mb-4 ">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-green-400 tracking-widest uppercase">
              {order ? order.length : 0} Total Orders
            </span>
          </div>

        </div>
      </div>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto p-6 py-10">

          <div className="space-y-8">

            {/* Check if orders exist */}
            {order && order.length > 0 ? (
              order.map((item) => (
                <div
                  key={item._id || item.id}
                  className="group relative bg-[#161b22] border border-white/5 p-1 rounded-32px transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >

                  {/* Inner glassmorphism card */}
                  <div className="bg-[#0b0f1a] rounded-[28px] p-6 relative overflow-hidden">

                    {/* Hover glow effect */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600 opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-700" />

                    {/* Order item component */}
                    <OrderList orderData={item} />
                  </div>

                </div>
              ))
            ) : (
              // Empty state UI when no orders exist
              <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/5">

                {/* Empty state icon */}
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>

                {/* Empty state text */}
                <h3 className="text-xl font-bold text-gray-400">No orders yet</h3>
                <p className="text-gray-600 text-sm mt-2">
                  When you buy something, it will appear here.
                </p>

              </div>
            )}

          </div>

          {/* Bottom spacing for better scroll UX */}
          <div className="h-20" />
        </div>
      </div>

    </div>
  );
};

export default OrderHistory;