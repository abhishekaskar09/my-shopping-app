const jwt = require('jsonwebtoken');
const User = require('../models/AuthModel');

exports.middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: 'token missing please check!' });
        }
        const token = authHeader.split(" ")[1]?.trim();
     

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'user are not exist' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Middleware Error:", error.message);
        return res.status(401).json({
            message: "Token invalid or expire !",
            error: error.message
        });
    }
}