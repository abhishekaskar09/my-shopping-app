 const Cart = require('../models/CartModel');

// 1. ADD TO CART LOGIC
exports.createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existing = cart.products.findIndex((item) => item.productId.toString() === productId);
      if (existing > -1) {
        cart.products[existing].quantity += Number(quantity);
      } else {
        cart.products.push({ productId, quantity: Number(quantity) });
      }
      await cart.save();
    } else { 
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity: Number(quantity) }],
      });
    }

    // वर्सेल सेफ पॉप्युलेट करने का सही तरीका:
    const updatedCart = await Cart.findById(cart._id).populate('products.productId');

    const totalPrice = updatedCart.products.reduce((total, item) => {
      const price = item.productId ? Number(item.productId.price) : 0;
      return total + (price * item.quantity);
    }, 0);

    const totalItems = updatedCart.products.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({ 
      message: 'Cart items updated successfully', 
      carts: updatedCart.products, 
      totalItems, 
      totalPrice 
    });

  } catch (error) {
    console.log('Server Error in createCart controller', error);
    res.status(500).json({ message: 'Server Error in createCart controller', error: error.message });
  }
};

// 2. GET CART LOGIC
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate('products.productId');
    
    if (!cart || !cart.products) {
      return res.status(200).json({ message: 'Carts are Empty', carts: [], totalItems: 0, totalPrice: 0 });
    }

    const totalPrice = cart.products.reduce((total, item) => {
      const price = item.productId ? Number(item.productId.price) : 0;
      return total + (price * item.quantity);
    }, 0);

    const totalItems = cart.products.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({ 
      message: 'Cart Items fetched successfully', 
      carts: cart.products,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.log('Server Error in getCart controller', error);
    res.status(500).json({ message: 'Server Error in getCart controller', error: error.message });
  }
};

// 3. UPDATE QUANTITY LOGIC (+1 or -1)
exports.updatedCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; 
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is Empty!" });
    }

    const itemIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

    if (itemIndex > -1) {
      if (cart.products[itemIndex].quantity <= 1 && Number(quantity) === -1) {
        // अगर १ बची है और यूजर माइनस कर रहा है, तो प्रोडक्ट को ही उड़ा दो या १ पर रोक दो
        return res.status(200).json({ message: "Minimum quantity should be 1", carts: cart.products });
      }

      cart.products[itemIndex].quantity += Number(quantity);
      await cart.save();

      const updatedCart = await Cart.findById(cart._id).populate("products.productId");
      
      const totalPrice = updatedCart.products.reduce((total, item) => {
        const price = item.productId ? Number(item.productId.price) : 0;
        return total + (price * item.quantity);
      }, 0);

      const totalItems = updatedCart.products.reduce((total, item) => total + item.quantity, 0);

      return res.status(200).json({
        message: "Quantity updated successfully",
        carts: updatedCart.products,
        totalItems,
        totalPrice
      });
    } else {
      return res.status(404).json({ message: "Product cart mein nahi hai!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update error", error: error.message });
  }
};

// 4. DELETE ITEM LOGIC
exports.deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // यहाँ पुरानी कंडीशन गलत थी (=== होना चाहिए था ढूंढने के लिए)
    const existing = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (existing === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("products.productId");

    res.status(200).json({
      message: "Item deleted from cart successfully",
      carts: updatedCart.products
    });
  } catch (error) {
    res.status(500).json({ message: "Cart Delete Error", error: error.message });
  }
};