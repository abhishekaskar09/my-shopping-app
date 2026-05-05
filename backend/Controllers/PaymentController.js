const Razorpay = require('razorpay');
const Payment = require('../models/PaymentModel');
const crypto = require('crypto');
const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log(process.env.RAZORPAY_KEY_ID)


exports.processPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: "amount or orderId missing hai frontend se!"
      });
    }



    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${orderId}`.slice(0, 40),
    };

    console.log("Razorpay options:", options);

    const razorOrder = await instance.orders.create(options);

    if (!razorOrder) {
      return res.status(500).json({ success: false, message: "Razorpay order are not create " });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { razorpayOrderId: razorOrder.id },
      { returnDocument: 'after' }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Database order not found!" });
    }

    res.status(200).json({
      success: true,
      razorOrder
    });

  } catch (error) {
    console.error("PROCESS PAYMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error in paymentProccess"
    });
  }
};


// Step 2: Signature Verify

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      amount
    } = req.body;
    const userId = req.user.id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;


    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Secret used:", process.env.RAZORPAY_KEY_SECRET);
    console.log("Expected:", expectedSignature);
    console.log("Received:", razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        userId,
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount
      });

      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'success' });
      await Cart.findOneAndDelete({ userId });


      res.status(200).json({
        success: true,
        message: "Payment Verified & Order Placed Successfully! ✅",
        orderId: orderId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Signature Mismatch! Payment Verification Failed. ❌"
      });
    };

  } catch (error) {
    console.log("Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};