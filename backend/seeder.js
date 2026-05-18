 const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
require('dotenv').config();

const fetchApiData = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

     await Product.deleteMany();
    console.log("Old products cleared.");

     const response = await axios.get('https://dummyjson.com/products?limit=194');
    const apiData = response.data;

     const newData = apiData.products.map((item) => ({
      title: item.title,
      thumbnail: item.thumbnail,
      description: item.description,
      category: item.category,
      price: item.price,
      rating: item.rating
    }));

     console.log("Inserting 194 products into database...");
    await Product.insertMany(newData);
    console.log("All 194 Products Seeded Successfully! 🎉");

     await mongoose.connection.close();
    console.log("Database connection closed cleanly.");
    process.exit(0);

  } catch (error) {
    console.error("Seeding failed! ❌", error);
    process.exit(1);
  }
} 

fetchApiData();