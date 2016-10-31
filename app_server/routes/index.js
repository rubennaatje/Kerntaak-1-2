var express = require('express');
var router = express.Router();

//--=[ Controllers ]=--\\
var agendaController = require('../controllers/agenda');
var ticketController = require('../controllers/ticket');
//--=[ End Controllers ]=--\\


//--=[ Router GETS ]=--\\
router.get('/', function (req, res) {
    res.render('index.html.twig');
});
router.get('/speakers', function (req, res) {
    res.render('speakers.html.twig', {
        speaker: req.session.speaker
    });
});
router.get('/about', function (req, res) {
    res.render('about.html.twig');
});
router.get('/agenda', agendaController);
router.get('/tickets', ticketController);




module.exports = router;
