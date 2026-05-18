 const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  thumbnail:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  rating:{
    type:String,
    required:true,
  },
  price:{
    type:String,
    required:true,
  }
},{timestamps:true});

 module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);