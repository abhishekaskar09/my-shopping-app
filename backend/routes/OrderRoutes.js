const express=require('express');
const router=express.Router();


const {createOrder,getOrder}=require('../Controllers/OrderController');
const {middleware}=require('../middleWare/MiddleWare');

router.post('/create',middleware,createOrder);
router.get('/get',middleware,getOrder);

module.exports=router;