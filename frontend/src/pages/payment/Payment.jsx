import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyPaymentAsync, resetPaymentState } from '../../features/payment/PaymentSlice'; // Ye reset action add kar niche
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPaymentStarted = useRef(false);

  const { currentOrderId } = useSelector((state) => state.order);
  const { razorOrderData, loading, success } = useSelector((state) => state.razorOrderData);
  const { carts } = useSelector((state) => state.carts);

  useEffect(() => {
    return () => {
      dispatch(resetPaymentState());
      isPaymentStarted.current = false;
    };
  }, [dispatch]);

  const totalAmount = useMemo(() => {
    const total = carts.reduce((acc, item) => acc + (item.productId?.price * item.quantity), 0);
    return total + (total * 0.18); 
  }, [carts]);

  useEffect(() => {
    if (razorOrderData && !success && !loading && !isPaymentStarted.current) {
      console.log("Opening Razorpay with ID:", razorOrderData.id);  
      const options = {
        key: "rzp_test_ShzF1lsQh6qbfJ",
        amount: razorOrderData.amount,
        currency: razorOrderData.currency,
        name: "Smart Cart Store",
        order_id: razorOrderData.id,
        
        handler: async (response) => {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: currentOrderId,
            amount: totalAmount,
          };

          const result = await dispatch(verifyPaymentAsync(verifyData));
          
          if (result.payload?.success) {
             dispatch(resetPaymentState());
            isPaymentStarted.current = false;
            navigate('/orderHistory');
          } else {
            isPaymentStarted.current = false;
          }
        },
        modal: {
          ondismiss: function () {
            isPaymentStarted.current = false;
             dispatch(resetPaymentState()); 
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      isPaymentStarted.current = true;
    }
  }, [razorOrderData, success, loading]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-2xl font-bold italic">Processing Your Secure Payment</h1>
      {loading ? (
        <div className="mt-5 text-green-600 font-bold animate-bounce">Verifying... Don't close this window</div>
      ) : (
        <p className="text-gray-500 mt-2">Finish the transaction in the Razorpay popup.</p>
      )}
    </div>
  );
};
export default Payment;