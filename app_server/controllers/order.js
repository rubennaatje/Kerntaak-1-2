var Reservation = require('../database/models/reservation');
var Ticket = require('../database/models/ticket');
var Ticket_type = require('../database/models/ticket_type');
var Meal = require('../database/models/meal');
var Mailer = require('../config/mailconfig');
var PDFDocument = require('pdfkit');
var qr = require('qr-image');
var fs = require('fs');
var path = require('path');
var self = this;

// Puts the chosen tickets in the user's session
// this makes sure the user can still cancel it
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

// Inserts the whole order into the database
// Asks other functions to create a PDF file
// and send a mail
module.exports.orderInsert = function (req, res) {
    var user = {
        firstname: req.body.firstname,
        infix: req.body.infix,
        lastname: req.body.lastname,
        email: req.body.email
    };
    Reservation.new(user, function (err, lastid) {
        var counter = 0;
        var lunchdone = false;
        var dinnerdone = false;
        if (err) {
            console.log(err);
        } else {
            Ticket.new(req.session.order, lastid, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.session.order.ticket.type == 4) {
                        Ticket_type.parse_partout(req.session.order.ticket.amount, function (err, callback) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (req.session.order.lunch > 0 && lunchdone == false) {
                        lunchdone = true;
                        Meal.new({meal:{type: 1, amount: req.session.order.lunch}}, lastid, function(err, callback) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    if (req.session.order.dinner > 0 && dinnerdone == false) {
                        dinnerdone = true;
                        Meal.new({meal:{type: 2, amount: req.session.order.dinner}}, lastid, function(err, callback) {
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

// Sends the mail with the PDF file attached to the user
// Input is the userobject 'user' and the INT 'lastid'
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
                    var i = obj.length;
                    for (var key in meals) {
                        if (meals.hasOwnProperty(key)) {
                            obj[i] = meals[key];
                        }
                        i++
                    }
                    setTimeout(function() {self.createPDF(obj, function (err, pdf) {
                        if (err) {
                            console.log(err);
                        } else {

                            var mailOptions = {
                                from: '"ICT4D" <conference@mauritsversluis.nl>', // sender address
                                to: user.email, // list of receivers
                                subject: 'Confirmation ticket reservation', // Subject line
                                text: 'Your ticket reservation has been completed!', // plaintext body
                                html: 'Dear ' + user.firstname + ', <br><br>Your order has been completed!<br><br>' +
                                'If you would like to cancel your reservation, please click the following link:<br>' +
                                "<a href='https://kerntaak-1-2.herokuapp.com/order/cancel/" + lastid + "'>Cancel tickets</a><br>" +
                                "Cancelling tickets needs to be done within 2 weeks of purchase.<br><br>" +

                                "We're looking forward to seeing you on our convention!",
                                attachments: [{
                                    filename: 'tickets.pdf',
                                    path: path.resolve(process.cwd(),'output.pdf'),
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
                    })}, 5000);
                }
            });
        }
    });
};

// Creates the PDF file from the order Object 'obj'
module.exports.createPDF = function(obj, callback) {
    console.log('--=[ CREATING PDF ]=--');
    var doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('output.pdf'));
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var ticket = qr.imageSync(obj[key].barcode, {type:'png'});
            doc.image(ticket, 250, 0, {fit:[205, 205]});
            doc.text('Your ' + obj[key].type + ' ticket');
            doc.addPage();
        }
    }

    setTimeout(function () {
        doc.text('Extra info:');
        doc.text('You have received ' + obj.length + ' tickets.');
        doc.text('If you have bought more tickets than received,');
        doc.text('please contact customer support with your reservation ID.');
        doc.text('Your reservation ID is: ' + obj[0].reservation);
        doc.text("We're looking forward to seeing you at our convention!");
        doc.end();
        console.log('--=[ PDF CREATED AND SAVED ]=--');
        return callback(null, doc);
    }, 5000);
};

// If a user decides to cancel their tickets
// using the link provided in their e-mail,
// this function handles it
module.exports.cancelTickets = function (req, res) {
    Reservation.cancel(req.params.id, function(err, callback) {
        if (err) {
            console.log(err);
        } else {
            console.log(callback);
            if (callback.affectedRows == 0) {
                res.redirect('/order/cancel_failed');
            } else {
                res.redirect('/order/cancel_succeeded');
            }
        }
    })
};

// If a user misclicked or
// change their minds and press 'cancel',
// this function handles it
module.exports.cancelOrder = function (req, res) {
    delete req.session.order;
    res.redirect('/tickets');
};

// Renders the cancel_succeeded page after cancelling tickets
module.exports.cancelSucceeded = function (req, res) {
    res.render('cancel_succeeded.html.twig');
};

// If the cancel of the tickets has failed
// (due to being too late or some error)
// This function will render a message for the user
module.exports.cancelFailed = function (req, res) {
    res.render('cancel_failed.html.twig');
};