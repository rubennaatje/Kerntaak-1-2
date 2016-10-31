var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
var backendController = require('../controllers/backend');
//--=[ End Controllers ]=--\\

//--=[ Router GETS ]=--\\
router.get('/backend', backendController.loadIndex);
router.get('/backend/login', backendController.loadLogin);
router.get('/backend/logout', backendController.logout);

//--=[ Router POSTS ]=--\\
router.post('/backend/user/login', backendController.login);
router.post('/backend/assignSpot', backendController.assignSpot);
router.post('/backend/assignBudget', backendController.assignBudget);

module.exports = router;