var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
var requestController = require('../controllers/request');
//--=[ End Controllers ]=--\\

//--=[ Router GETS ]=--\\
router.get('/spot/request', requestController.loadRequest);
router.get('/spot/selectspot', requestController.loadSelect);

//--=[ Router POSTS ]=--\\
router.post('/spot/submitrequest', requestController.createRequest);
router.post('/spot/insertrequest', requestController.insertRequest);


module.exports = router;
