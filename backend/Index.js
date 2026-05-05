    require("dotenv").config();
    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");

    const app = express();

    // 1. Middlewares
    app.use(cors());
    app.use(express.json());

    const ProductRoutes=require('./routes/ProductRoutes');
    const AuthRoutes=require('./routes/AuthRoutes');
    const CartRoutes=require('./routes/CartRoutes');
    const OrderRoutes=require('./routes/OrderRoutes');
    const paymentRoutes = require('./routes/PaymentRoutes');

    // 2. Database Connection
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("✅ MongoDB connected"))
        .catch((err) => console.log("❌ DB Connection Error: ", err));
    
    app.use('/api/products',ProductRoutes);
    app.use('/api/auth',AuthRoutes);
    app.use('/api/carts',CartRoutes);
    app.use('/api/orders',OrderRoutes);
    app.use('/api/payment', paymentRoutes);

    // 3. 404 Not Found Middleware  
    app.use((req, res, next) => {
        const error = new Error(`diraction not found - ${req.originalUrl}`);
        res.status(404);
        next(error);
    });
    // 4. Main Error Middleware 
    app.use((err, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    });

    // 5. Server Start
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`🚀 Server running on port ${PORT}`)
    );