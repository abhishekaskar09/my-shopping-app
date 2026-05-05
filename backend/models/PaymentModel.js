 const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  orderId: { type: mongoose.Schema.ObjectId, ref: 'Order', required: true },

  razorpay_order_id: { type: String, required: true },

  razorpay_payment_id: { type: String, required: true},

  razorpay_signature: { type: String, required: true }, 

  amount: { type: Number, required: true },
  
 }, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);