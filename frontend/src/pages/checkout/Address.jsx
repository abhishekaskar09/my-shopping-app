 import React, { useState } from 'react';
import { createCheckoutAsync } from '../../features/checkout/CheckOutSlice';
import { checkoutSchema } from '../../zod/CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processPaymentAsync } from '../../features/payment/PaymentSlice';

const Address = () => {
  // Accessing cart state for total amount calculation
  const { carts } = useSelector((state) => state.carts);
  
  // Financial calculation logic for order processing
  const total = carts.reduce((total, item) => total + (item.productId?.price * item.quantity), 0);
  const taxPaid = total * 0.18;
  const totalAmount = total + taxPaid;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for address fields and validation feedback
  const [address, setAddress] = useState({ street: "", phone: "", city: "", pincode: "" });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // Field update handler with instant error clearing
  const handleSave = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  }

  // Validating data with Zod and triggering the checkout process
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const result = await checkoutSchema.safeParse(address);

      if (!result.success) {
        // Mapping validation issues to the error state
        const existing = result.error?.issues.reduce((accum, items) => {
          if (!accum[items.path[0]]) {
            accum[items.path[0]] = items.message;
          } return accum;
        }, {});
        setError(existing);
        return;
      }

      setError({});
      const response = await dispatch(createCheckoutAsync({ address: address }));

      if (response.payload?.orderId) {
        const dbOrderId = response.payload.orderId;
        // Initiating payment gateway logic
        await dispatch(processPaymentAsync({ amount: totalAmount, orderId: dbOrderId }));
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setConfirm(false);
      }, 1000);

      setTimeout(() => {
        setConfirm(false);
        navigate('/payment');
      }, 3000);

    } catch (err) {
      console.log('Checkout error:', err);
    }
  }

  return (
    // FIX: rounded-[2rem] -> rounded-4xl (No design change, standard Tailwind)
    <div className="flex items-center justify-center p-2 bg-[#acaeb4] rounded-4xl">
      
      {/* 🏙️ Compact Form: Optimized height to ensure button visibility without scrolling */}
      <form 
        onSubmit={handleForm} 
        className="w-full max-w-md bg-[#161b22] border border-white/10 p-5 rounded-[2.5rem] shadow-2xl space-y-4 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 opacity-10 blur-[50px]" />

        <div className='text-center'>
          <h2 className='text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]'>Logistics</h2>
          <h1 className='text-2xl font-black text-white'>Shipping <span className='text-blue-500'>Info</span></h1>
        </div>

        {/* 🏠 Street Input Area */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Area / Street</label>
          <input
            type="text"
            name="street"
            value={address.street}
            placeholder="Street address..."
            onChange={handleSave}
            className={`w-full px-4 py-2 bg-[#0b0f1a] border rounded-xl outline-none text-sm transition-all text-white placeholder-gray-600 focus:ring-1 ${error.street ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:ring-blue-500/20'}`}
          />
          {error.street && <p className="text-red-400 text-[9px] font-bold mt-1 ml-1 italic">⚠ {error.street}</p>}
        </div>

        {/* 📞 Phone Number Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={address.phone}
            placeholder="Mobile number"
            onChange={handleSave}
            className={`w-full px-4 py-2 bg-[#0b0f1a] border rounded-xl outline-none text-sm transition-all text-white placeholder-gray-600 focus:ring-1 ${error.phone ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:ring-blue-500/20'}`}
          />
          {error.phone && <p className="text-red-400 text-[9px] font-bold mt-1 ml-1 italic">⚠ {error.phone}</p>}
        </div>

        {/* 🏙️ City & Zip Section (Horizontal Layout) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              placeholder="City"
              onChange={handleSave}
              className={`w-full px-4 py-2 bg-[#0b0f1a] border rounded-xl outline-none text-sm transition-all text-white placeholder-gray-600 focus:ring-1 ${error.city ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:ring-blue-500/20'}`}
            />
            {error.city && <p className="text-red-400 text-[9px] font-bold mt-1 ml-1 italic">⚠ {error.city}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              placeholder="Code"
              onChange={handleSave}
              className={`w-full px-4 py-2 bg-[#0b0f1a] border rounded-xl outline-none text-sm transition-all text-white placeholder-gray-600 focus:ring-1 ${error.pincode ? 'border-red-500/50 focus:ring-red-500/10' : 'border-white/5 focus:ring-blue-500/20'}`}
            />
            {error.pincode && <p className="text-red-400 text-[9px] font-bold mt-1 ml-1 italic">⚠ {error.pincode}</p>}
          </div>
        </div>

        {/* 🚀 Submission Button with state-based styling */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={success}
            className={`relative w-full py-3 rounded-xl font-black text-[11px] tracking-[0.15em] uppercase transition-all duration-300 group
            ${success 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : confirm 
              ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
              : 'bg-white text-black hover:bg-blue-600 hover:text-white active:scale-95 shadow-xl'}`}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {success ? (
                <>
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : confirm ? "Order Ready ✓" : "Verify & Pay"}
            </div>
          </button>
        </div>

        <p className='text-[8px] text-center text-gray-600 font-bold uppercase tracking-widest'>
          Secure AES-256 Bit Encryption
        </p>
      </form>
    </div>
  );
};

export default Address;