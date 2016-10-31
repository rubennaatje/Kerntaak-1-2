var Request = require('../database/models/request');
var Speaker = require('../database/models/speaker');
var Spot = require('../database/models/spot');


//--=[ LOAD ITEMS ]=--\\
module.exports.loadRequest = function (req, res) {
    res.render('request.html.twig', {
        requestComplete: req.session.requestComplete
    });
};

module.exports.loadSelect = function (req, res) {
    if (!req.session.request) {
        res.redirect('/spot/request');
    } else {
        Spot.getAll(function (err, spots) {
            if (err) {
                console.log(err);
            } else {
                res.render('select_spot.html.twig', {
                    spots: spots,
                    message: req.session.message
                });
            }
        })
    }
};


//--=[ DATABASE ITEMS ]=--\\
module.exports.createRequest = function (req, res) {
    req.session.request = req.body;
    res.redirect('/spot/selectspot');
};

module.exports.insertRequest = function (req, res) {
    var userobj = req.session.request;
    var userarray = [];
    for (var key in userobj) {
        if (userobj.hasOwnProperty(key)) {
            if (key != 'submit') {
                userarray.push(userobj[key]);
            }
        }
    }
    var obj = req.body;
    var requestobj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] != '0' && key != 'submit' && isNaN(key) == false) {
                if(obj[key] in requestobj) {
                    var choice = '';
                    switch(obj[key]) {
                        case 'spot_first': choice = 'first choice'; break;
                        case 'spot_second': choice = 'second choice'; break;
                        case 'spot_third': choice = 'third choice'; break;
                    }
                    req.session.message = 'You have selected ' + choice + ' multiple times!';
                    res.redirect('/spot/selectspot');
                    return;
                } else {
                    requestobj[obj[key]] = key;
                }

            }

        }
    }

    Speaker.new(userarray, function (err, lastid) {
        if (err) {
            console.log(err);
        } else {
            requestobj['speaker'] = lastid;
            requestobj['subject'] = obj.subject;
            requestobj['sub_desc'] = obj.sub_desc;
            requestobj['extra_wishes'] = obj.extra_wishes;

            Spot.parseRequest(requestobj.spot_first, function (err, callback) {
                if (err) {
                    console.log(err);
                } else {
                    Request.new(requestobj, function (err, callback) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.session.speaker = {
                                id: lastid,
                                firstname: userarray[0],
                                infix: userarray[1],
                                lastname: userarray[2],
                                email: userarray[3]
                            };
                            delete req.session.message;
                            delete req.session.request;
                            req.session.requestComplete = 'Request submitted!';
                            res.redirect('/spot/request');
                        }
                    })
                }
            });
        }
    });
};