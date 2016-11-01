var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
var orderController = require('../controllers/order');
//--=[ End Controllers ]=--\\

//--=[ Router GETS ]=--\\
router.get('/order/cancel/:id', orderController.cancelTickets);
router.get('/order/cancel_failed', orderController.cancelFailed);
router.get('/order/cancel_succeeded', orderController.cancelSucceeded);

//--=[ Router POSTS ]=--\\
router.post('/order/submit', orderController.orderSubmit);
router.post('/order/insert', orderController.orderInsert);

module.exports = router;
