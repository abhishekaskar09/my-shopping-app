const express=require('express');
const router=express.Router();

const {getProducts}=require('../Controllers/ProductController');

 router.get('/get',getProducts);
 
module.exports=router;