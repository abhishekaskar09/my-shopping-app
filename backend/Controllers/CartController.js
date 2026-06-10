const Cart = require('../models/CartModel');

// carts items added
exports.createCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let carts = await Cart.findOne({ userId });
    if (carts) {
      const existing = carts.products.findIndex((item) => item.productId.toString() === productId);
      if (existing > -1) {
        carts.products[existing].quantity += Number(quantity);
      } else {
        carts.products.push({ productId, quantity: Number(quantity) });
      }
      const cart = await carts.save();
      const updatedCart = await cart.populate('products.productId');
      const totalPrice = updatedCart.products.reduce((total, items) => total + (Number(items.productId.price) * items.quantity), 0);
      const totalItems = updatedCart.products.reduce((total, items) => total + items.quantity, 0);

      return res.status(200).json({ message: 'cart items are updated', carts: updatedCart.products, totalItems: totalItems, totalPrice: totalPrice });
    }
    else { 
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
      const newCartItems = await newCart.populate('products.productId');
      const totalPrice = newCartItems.products.reduce((total, items) => total + (Number(items.productId.price) * items.quantity), 0);
 
      const totalItems = newCartItems.products.reduce((total, items) => total + items.quantity, 0);

      return res.status(201).json({ message: 'new items are added!', carts: newCartItems.products, totalItems: totalItems, totalPrice: totalPrice });
    }
  } catch (error) {
    console.log('server Error carts are not Founds! in createController', error);
    res.status(500).json({ message: 'server Error carts are not Founds! in createController', message: error.message });
  }
}


// carts get
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let carts = await Cart.findOne({ userId }).populate('products.productId');
    if (!carts) {
      return res.status(200).json({ message: 'carts are Empty', products: [] });
    }
    res.status(200).json({ message: 'carts Items are get SuccessFully', carts: carts.products })
  } catch (error) {
    console.log('server Error carts are not Founds! in get Controller', error);
    res.status(500).json({ message: 'server Error carts are not Founds! in getController', message: error.message });
  }
}


// carts item quantity updated 
exports.updatedCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // quantity: 1 or -1
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart are Empty!" });
    }

    // 1. Product findz
    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.products[itemIndex];


      if (item.quantity <= 1 && quantity === -1) {
        return res.status(200).json({
          message: "Minimum quantity should be 1",
          carts: cart.products
        });
      }

      item.quantity += Number(quantity);

      await cart.save();
      const updatedCart = await cart.populate("products.productId");
      const totalPrice = updatedCart.products.reduce((total, items) => total + (items.productId.price * items.quantity), 0);
      const totalItems = updatedCart.products.reduce((total, items) => total + items.quantity, 0);


      return res.status(200).json({
        message: "Quantity updated successfully",
        carts: updatedCart.products,
        totalItems: totalItems,
        totalPrice: Number(totalPrice)
      });

    } else {
      return res.status(404).json({ message: "Product cart mein nahi hai!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update error", error: error.message });
  }
};

// deleted items logic
exports.deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: 'cart are empty' });
    }

    const existing = cart.products.findIndex((p) => p.productId.toString() !== productId);
    if (!existing) {
      return res.status(404).json({ message: "Item cart are empty" });
    }
    cart.products = cart.products.filter((p) => p.productId.toString() !== productId);

    await cart.save();
    const updatedCart = await cart.populate("products.productId");

    res.status(200).json({
      message: "Item cart are deleted",
      carts: updatedCart.products
    });

  } catch (error) {
    res.status(500).json({ message: "Carts Delete Error ", error: error.message });
  }
};