var Ticket = require('../database/models/ticket');
var Ticket_type = require('../database/models/ticket_type');
var Meal_type = require('../database/models/meal_type');


var ticketController = function (req, res) {
    if (req.session.order) {
        Ticket_type.findBy({id: req.session.order.ticket.type}, function (err, order) {
            if (err) {
                console.log(err);
            } else {
                Meal_type.getAll(function (err, meals) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('ticket.html.twig', {
                            tickets: order,
                            meals: meals,
                            order: req.session.order,
                            orderComplete: req.session.orderComplete
                        });
                    }
                })
            }
        })
    } else {
        Ticket_type.getAll(function (err, tickets) {
            if (err) {
                console.log(err);
            } else {
                Meal_type.getAll(function (err, meals) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('ticket.html.twig', {
                            tickets: tickets,
                            meals: meals,
                            orderComplete: req.session.orderComplete
                        });
                    }
                })
            }
        });
    }
};

module.exports = ticketController;