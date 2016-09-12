var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/backend', function (req, res, next) {
    if (!req.session.user || req.session.user.role_id == 1) {
        res.redirect('/');
    }
});


router.get('/backend/login', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/backend');
    }
    res.render('backend/backend_login.html.twig');
});

router.post('/backend/user/login', function (req, res, next) {
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
            req.session.orders = [];
            res.redirect('/backend');
        }
    });
});

module.exports = router;