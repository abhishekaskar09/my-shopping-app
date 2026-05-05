const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },

  products: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
     }
  ],

  totalAmount: { type: Number, required: true },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'success'],
    default: 'pending',
  },
  address: {
    street: String,
    phone: Number,
    city: String,
    pincode: Number,
  },
  razorpayOrderId: {
    type: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);