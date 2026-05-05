const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');



exports.createOrder = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    let order = await Cart.findOne({ userId }).populate("products.productId");
    if (!order) {
      return res.status(400).json({ message: 'orders Not Founds!' });
    }

    const orderItems = order.products.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
     }));
       //  totalAmount of orders
     const totalPrice=order.products.reduce((total,items)=>total+(Number(items.productId.price)*items.quantity),0);
     
    //  order amount with gst tax
     const finalAmount = totalPrice + (totalPrice * 0.18);
 
    let orders = new Order({
      userId,
      products: orderItems,
      address, 
      totalAmount:finalAmount, 
      paymentStatus: 'pending',
    });

    await orders.save();

    await orders.populate('products.productId');

    res.status(201).json({
      message: 'Order placed successFully!✅',
      orderId:orders._id,
      orders: orders,
      paymentStatus: orders.paymentStatus,
      address: orders.address,
      totalAmount:orders.finalAmount,
    });
  } catch (error) {
    console.log('sever error in createOrder ', error);
    res.status(500).json({ message: 'sever error in createOrder', message: error.message })
  }
}


exports.getOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    let orders = await Order.find({ userId }).populate('products.productId').sort({createdAt:-1});
    if (!orders) {
      return res.status(400).json({ message: 'orders Not Founds!' });
    }

    res.status(200).json({
      message: 'Order placed get successFully!✅',
      orders: orders,
    });
  } catch (error) {
    console.log('sever error in getOrder ', error);
    res.status(500).json({ message: 'sever error in getOrder', message: error.message })
  }
}