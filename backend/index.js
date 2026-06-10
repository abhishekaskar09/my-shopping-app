 require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const ProductRoutes = require("./routes/ProductRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const CartRoutes = require("./routes/CartRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");

// ─── यहाँ से बदलाव शुरू ──────────────────────────────────────────────────
// ग्लोबल लेवल पर कनेक्शन प्रॉमिस को कैशे करने के लिए वेरिएबल
let cachedConnection = null;

const connectDB = async () => {
  // 1. अगर पहले से कनेक्शन रेडी है, तो तुरंत आगे बढ़ो (0 मिलीसैकंड डिले)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // 2. अगर कनेक्शन प्रोसेस में है, तो उसी प्रॉमिस का इंतज़ार करो, नया मत बनाओ
  if (cachedConnection) {
    await cachedConnection;
    return;
  }

  try {
    // 3. वर्सेल सर्वरलेस के लिए ऑप्टिमाइज्ड मोंगोडीबी कॉन्फ़िगरेशन
    cachedConnection = mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,             // एक साथ 10 कनेक्शंस का पूल ऑन रखेगा
      serverSelectionTimeoutMS: 5000, // अगर 5 सेकंड में कनेक्ट न हो तो ही एरर दे
      socketTimeoutMS: 45000,
    });

    await cachedConnection;
    console.log("🚀 MongoDB connected & connection pool cached");
  } catch (err) {
    cachedConnection = null; // एरर आने पर कैशे को साफ़ करो ताकि अगली रिक्वेस्ट दोबारा ट्राई कर सके
    console.log("❌ DB Connection Error:", err);
  }
};
// ─── यहाँ तक बदलाव ख़त्म ──────────────────────────────────────────────────

// हर एपीआई रिक्वेस्ट आने पर कनेक्शन एश्योर करने का मिडलवेयर
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/products", ProductRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/carts", CartRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/payment", paymentRoutes);

module.exports = app;