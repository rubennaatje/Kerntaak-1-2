var User = require('../database/models/user');
var Request = require('../database/models/request');
var Spot = require('../database/models/spot');
var Agenda = require('../database/models/agenda');
var Budget_request = require('../database/models/budget_request');
var Moderator = require('../database/models/moderator');
var Speaker = require('../database/models/speaker');
var Agenda = require('../database/models/agenda');
var Mailer = require('../config/mailconfig');
var self = this;

module.exports.loadIndex = function (req, res) {
    if (!req.session.user) {
        res.redirect('/backend/login');
    } else {
        Request.getAll(function (err, requests) {
            if (err) {
                console.log(err);
            } else {
                Spot.getAll(function (err, spots) {
                    if (err) {
                        console.log(err);
                    } else {
                        Budget_request.getAll(function(err, budget_requests) {
                            if (err) {
                                console.log(err);
                            } else {
                                Budget_request.findBy({accepted: 1}, function (err, accepted) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        Moderator.getBudget(function(err, budget) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                Agenda.getAll(function(err, speakers) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        res.render('backend/backend_base.html.twig', {
                                                            user: req.session.user,
                                                            requests: requests,
                                                            spots: spots,
                                                            budget_requests: budget_requests,
                                                            budget: budget,
                                                            accepted: accepted,
                                                            speakers: speakers
                                                        })
                                                    }
                                                });

                                            }
                                        });
                                    }
                                });

                            }
                        })
                    }
                })
            }
        });
    }
};

module.exports.loadLogin = function (req, res) {
    if (req.session.user) {
        res.redirect('/backend');
    } else {
        res.render('backend/backend_login.html.twig');
    }
};

module.exports.assignSpot = function (req, res) {
    Agenda.new(req.body, function (err, callback) {
        if (err) {
            console.log(err);
        } else {
            Request.delete(req.body.request_id, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {
                    Spot.parseAssign(req.body.assign_choice, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {
                            self.sendConfirmMail({firstname: req.body.firstname, email: req.body.email}, function(err, callback) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.redirect('/backend');
                                }
                            });
                        }
                    })
                }
            })
        }
    })
};

module.exports.assignBudget = function (req, res) {
    if (req.body.decision == 0) {
        Moderator.updateBudget({budget: req.body.budget}, function (err, callback) {
            if (err) {
                console.log(err);
            } else {
                Budget_request.accept({id: req.body.request_id}, function (err, callback) {
                    if (err) {
                        console.log(err);
                    } else {
                        Speaker.assignBudget({budget: req.body.budget, speaker_id: req.body.speaker_id}, function (err, callback) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect('/backend');
                            }
                        })
                    }
                })
            }
        })
    } else if (req.body.decision == 1) {
        Budget_request.reject({id: req.body.request_id, counteramount: req.body.counteramount}, function (err, callback) {
            if (err) {
                console.log(err);
            } else {
                self.sendCounterMail(req.body, function (err, callback) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backend');
                    }
                })
            }
        })
    }
};

module.exports.login = function (req, res) {
    var object = {
        email: req.body.email,
        password: req.body.password
    };

    User.login(object, function (err, fulluser) {
        if (err) {
            console.log('err = ' + err);
            res.redirect('/backend/login');
        } else {
            req.session.user = fulluser;
            res.redirect('/backend');
        }
    });
};

module.exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};

module.exports.sendConfirmMail = function (user, callback) {
    var mailOptions = {
        from: '"ICT4D" <zakelijk@mauritsversluis.nl>', // sender address
        to: user.email, // list of receivers
        subject: 'Confirmation spot request', // Subject line
        text: 'Your spot request has been assigned!', // plaintext body
        html: 'Dear ' + user.firstname + ', <br><br>You have been assigned your spot!<br><br>' +
        "We're looking forward to see you speak on our convention"
    };

    // send mail with defined transport object
    Mailer.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, info);
        }
    });
};

module.exports.sendCounterMail = function (obj, callback) {
    var mailOptions = {
        from: '"ICT4D" <zakelijk@mauritsversluis.nl>', // sender address
        to: obj.email, // list of receivers
        subject: 'Your budget request', // Subject line
        text: 'Your budget request has been denied!', // plaintext body
        html: 'Dear ' + obj.firstname + ', <br><br>Your budget request has been denied<br>' +
        'However, we are willing to give you a counter offer of &euro;' + obj.counteramount + '<br>' +
        "By clicking the following link you will accept the offer:<br>" +
        "<a href='https://kerntaak-1-2.herokuapp.com/acceptoffer/" + obj.request_id + "'>Accept offer</a><br>" +
        "But, if you don't agree, you can click this link:<br>" +
        "<a href='https://kerntaak-1-2.herokuapp.com/rejectoffer/" + obj.request_id + "'>Reject offer</a><br><br>" +
        "All the best,<br>" +
        "The Organizer"
    };

    // send mail with defined transport object
    Mailer.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, info);
        }
    });
};