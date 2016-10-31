var Agenda = require('../database/models/agenda');

var agendaController = function(req, res) {
    Agenda.getAll(function(err, agenda) {
        if (err) {
            console.log(err);
        } else {
            res.render('agenda.html.twig', {
                agenda: agenda
            });
        }
    });
};

module.exports = agendaController;