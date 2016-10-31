var Budget_request = require('../database/models/budget_request');
var Moderator = require('../database/models/moderator');
var Speaker = require('../database/models/speaker');
var self = this;

//--=[ LOAD ITEMS ]=--\\
module.exports.loadRequest = function (req, res) {
    res.render('budgetrequest.html.twig', {
        speaker: req.session.speaker,
        budgetComplete: req.session.budgetComplete
    });
};

module.exports.acceptOffer = function (req, res) {
    Budget_request.findBy({id: req.params.id}, function (err, budgetobj) {
        if (err) {
            console.log(err);
        } else {
            Moderator.updateBudget({budget: budgetobj[0].requested_budget}, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {
                    Budget_request.accept({id: budgetobj[0].request_id}, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {
                            Speaker.assignBudget({budget: budgetobj[0].requested_budget, speaker_id: budgetobj[0].speaker_id}, function (err, callback) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // NOG AANPASSEN!
                                    res.redirect('/backend');
                                }
                            })
                        }
                    })
                }
            })
        }
    });
};

module.exports.rejectOffer = function (req, res) {
    Budget_request.delete({id: req.params.id}, function (err, callback) {
        if (err) {
            console.log(err);
        } else {
            // NOG AANPASSEN!
            res.redirect('/backend');
        }
    })
};

//--=[ DATABASE ITEMS ]=--\\
module.exports.handleRequest = function (req, res) {
    Budget_request.new(req.body, function(err, callback) {
        if (err) {
            console.log(err);
        } else {
            req.session.budgetComplete = 'Your budget request has been submitted successfully!';
            res.redirect('/speaker/requestbudget');
        }
    })
};