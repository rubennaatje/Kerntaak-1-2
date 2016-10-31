var Reservation = require('../database/models/reservation');
var Ticket = require('../database/models/ticket');
var Ticket_type = require('../database/models/ticket_type');
var Meal = require('../database/models/meal');
var Mailer = require('../config/mailconfig');
var PDFDocument = require('pdfkit');
var qr = require('qr-image');
var fs = require('fs');
var self = this;

module.exports.orderSubmit = function (req, res) {
    var order = {
        ticket: {
            type: req.body.ticket_type,
            amount: req.body.ticket_amount
        },
        lunch: req.body.lunch_amount,
        dinner: req.body.dinner_amount
    };

    req.session.order = order;
    res.redirect('/tickets');
};

module.exports.orderInsert = function (req, res) {
    var user = {
        firstname: req.body.firstname,
        infix: req.body.infix,
        lastname: req.body.lastname,
        email: req.body.email
    };
    Reservation.new(user, function (err, lastid) {
        var counter = 0;
        if (err) {
            console.log(err);
        } else {
            if (req.session.order.lunch > 0) {
                Meal.new({meal: {type: 1, amount: req.session.order.lunch}}, lastid, function (err, callback) {
                    if (err) {
                        console.log(err);
                    }
                    self.createQR(callback, 'lunch', counter, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    });
                });
            }
            if (req.session.order.dinner > 0) {
                Meal.new({meal: {type: 2, amount: req.session.order.dinner}}, lastid, function (err, callback) {
                    if (err) {
                        console.log(err);
                    }
                    self.createQR(callback, 'dinner', counter, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    });
                });
            }
            Ticket.new(req.session.order, lastid, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {
                    self.createQR(callback, 'ticket', counter, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    });
                    if (req.session.order.ticket.type == 4) {
                        Ticket_type.parse_partout(req.session.order.ticket.amount, function (err, callback) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    counter++;
                    if (counter == req.session.order.ticket.amount) {
                        req.session.orderComplete = 'Your order has been completed successfully!';
                        self.sendMail(user, lastid, function (err, callback) {
                            if (err) {
                                console.log(err);
                            } else {
                                delete req.session.order;
                                res.redirect('/tickets');
                            }
                        })
                    }
                }
            });

        }
    });
};

module.exports.sendMail = function (user, lastid, callback) {
    Ticket.findBy({reservation: lastid}, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            Meal.findBy({reservation: lastid}, function (err, meals) {
                if (err) {
                    console.log(err);
                } else {
                    var text = '';
                    var day = '';

                    self.createPDF(obj, meals, function (err, pdf) {
                        if (err) {
                            console.log(err);
                        } else {

                            var mailOptions = {
                                from: '"ICT4D" <zakelijk@mauritsversluis.nl>', // sender address
                                to: user.email, // list of receivers
                                subject: 'Confirmation ticket reservation', // Subject line
                                text: 'Your ticket reservation has been completed!', // plaintext body
                                html: 'Dear ' + user.firstname + ', <br><br>Your order has been completed!<br><br>' +
                                'If you would like to cancel your reservation, please click the following link:<br>' +
                                "<a href='http://localhost:8000/order/cancel'>Cancel tickets</a><br>" +
                                "Cancelling tickets needs to be done within 2 weeks of purchase.<br><br>" +

                                "We're looking forward to seeing you on our convention!",
                                attachments: [{
                                    filename: 'tickets.pdf',
                                    path: 'C:/htdocs/kerntaak-1-2/ticket_pdf/output.pdf',
                                    contentType: 'application/pdf'
                                }]
                            };

                            // send mail with defined transport object
                            Mailer.transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    return callback(error, null);
                                } else {
                                    return callback(null, info);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports.createPDF = function (obj, meals, callback) {
    console.log('--=[ CREATING PDF ]=--');
    var doc = new PDFDocument;

    doc.pipe(fs.createWriteStream('ticket_pdf/output.pdf'));

    var i = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            self.insertPDF(doc, obj[key], 'ticket', i, null, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {

                }
            })
        }
        i++;
    }

    var lunch = 0;
    var dinner = 0;
    for (var key in meals) {
        if (obj.hasOwnProperty(key)) {
            console.log(meals[key].type);
            self.insertPDF(doc, meals[key], meals[key].type, lunch, dinner, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {

                }
            });
            lunch++;
            dinner++;
        }
    }
    setTimeout(function () {
        doc.end();
        return callback(null, doc);
    }, 5000);

};

module.exports.createQR = function (obj, type, teller, callback) {
    console.log('--=[ CREATING QR-CODE ]=--');

    var qrcode = qr.image(obj, {type: 'png'});
    var pipe = qrcode.pipe(fs.createWriteStream('ticket_codes/' + type + '-' + teller + '.png'));

    pipe.on('finish', function () {
        return callback(null, true);
    });
};

module.exports.insertPDF = function (doc, obj, type, i, dinner, callback) {
    console.log('--=[ NEW PAGE SUCCEEDED ]=--');
    doc.text('Uw ' + obj.type + ' ticket', 210, 0);
    if (i) {
        doc.image('ticket_codes/' + type + '-' + i + '.png', 0, 0, {fit: [205, 205]});
    }
    if (dinner) {
        doc.image('ticket_codes/' + type + '-' + dinner + '.png', 0, 0, {fit: [205, 205]});
    }
    console.log('--=[ IMAGE SUCCEEDED ]=--');
    doc.addPage();
    return callback(null, true);

};

module.exports.cancelTickets = function(req, res) {

};