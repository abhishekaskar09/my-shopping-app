const axios=require('axios');
const mongoose=require('mongoose')
const Product=require('./models/ProductModel');
require('dotenv').config();

const fetchApiData=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

     await Product.deleteMany();
    const response=await axios.get('https://dummyjson.com/products?limit=194');
    const apiData= response.data;

    const newData=apiData.products.map((item)=>({
      title:item.title,
      thumbnail:item.thumbnail,
      description:item.description,
      category:item.category,
      price:item.price,
      rating:item.rating
    }));
    const data= await Product.insertMany(newData);
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("Seeding failed! ❌", error);
    process.exit(1);
  }
} 

fetchApiData();