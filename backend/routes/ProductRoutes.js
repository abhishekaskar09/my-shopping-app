const express=require('express');
const router=express.Router();

const {getProducts,getCategories}=require('../Controllers/ProductController');

 router.get('/get',getProducts);
 router.get('/categories',getCategories);

module.exports=router;