var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
speakerController = require('../controllers/speaker');


//--=[ End Controllers ]=--\\

//--=[ Router GETS ]=--\\
router.get('/speaker/requestbudget', speakerController.loadRequest);
router.get('/acceptoffer/:id', speakerController.acceptOffer);
router.get('/rejectoffer/:id', speakerController.rejectOffer);

//--=[ Router POSTS ]=--\\
router.post('/speaker/insertrequest', speakerController.handleRequest);

module.exports = router;
