var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
var orderController = require('../controllers/order');
//--=[ End Controllers ]=--\\

//--=[ Router POSTS ]=--\\
router.post('/order/submit', orderController.orderSubmit);
router.post('/order/insert', orderController.orderInsert);


module.exports = router;
