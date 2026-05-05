 const express=require('express');
 const router=express.Router();
 
 const {createCart,getCart,updatedCart,deleteCart}=require('../Controllers/CartController');
 const {middleware}=require('../middleWare/MiddleWare');
  
 router.post('/create',middleware,createCart);
 router.get('/get',middleware,getCart);
 router.put('/update',middleware,updatedCart);
 router.delete('/delete/:productId',middleware,deleteCart);
 
 
 module.exports=router;