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

 const connectDB = async () => {
  
   if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected via serverless wrapper");
  } catch (err) {
    console.log("❌ DB Connection Error:", err);
  }
};

// 2. हर एपीआई रिक्वेस्ट आने पर कनेक्शन एश्योर करने का मिडलवेयर
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