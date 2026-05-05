 const express=require('express');
 const router=express.Router();
 
 const {processPayment,verifyPayment}=require('../Controllers/PaymentController');
 const {middleware}=require('../middleWare/MiddleWare');
  
 router.post('/process',middleware,processPayment);
 router.post('/verify',middleware,verifyPayment);
 
 module.exports=router;