 import React from 'react';

const CheckOutItems = ({ checkListData }) => {
  return (
    /* 🌌 Main Wrapper: Premium Glassmorphism card */
    <div className="relative group flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[2.5rem] bg-[#0b0f1a]/80 backdrop-blur-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-[1.01] hover:bg-white/5 hover:border-blue-500/30 hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.3)] overflow-hidden">
      
      {/* ✨ Dynamic Background Ray */}
      <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] group-hover:animate-pulse"></div>
      </div>

      {/* 🖼️ Media Container */}
       <div className="relative w-full md:w-32 h-32 shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
        <img 
          src={checkListData?.productId?.thumbnail || checkListData?.image} 
          alt={checkListData?.productId?.title} 
          className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
        />
         <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* ⭐ Premium Rating Badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-yellow-400 font-black border border-white/10 flex items-center gap-1 shadow-lg">
          {checkListData?.productId?.rating || "4.5"}
        </div>
      </div>

      {/* 📝 Information Section */}
      <div className="flex-1 flex flex-col gap-3 w-full text-center md:text-left min-w-0 z-10">
        <div className="space-y-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
             <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-all duration-500 truncate">
              {checkListData?.productId?.title}
            </h3>
            {/* Category Tag */}
            <span className="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-black bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 self-center md:self-start">
              {checkListData?.productId?.category}
            </span>
          </div>
        </div>

        {/* 💰 Price Display */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <span className="text-2xl font-black text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.3)]">
            ₹{checkListData?.productId?.price}
          </span>
        </div>
      </div>

      {/* 🔢 Quantity Display Box */}
       <div className="relative z-10 flex flex-col items-center justify-center bg-white/5 p-4 rounded-3xl border border-white/5 min-w-25 h-24 shadow-inner transition-all duration-500 group-hover:border-blue-500/20 group-hover:bg-black/40">
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Quantity</p>
          <span className="text-3xl font-black text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            {checkListData?.quantity}
          </span>
      </div>

      {/* ⚡ Subtle Bottom Edge Glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-1px bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

    </div>
  );
};

export default CheckOutItems;