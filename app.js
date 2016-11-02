var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var memcached = require('connect-memcached')(session);

var cookieStore = new memcached({hosts: "kerntaak-1-2.herokuapp.com:11211"});


var port = process.env.PORT || 8000;

// view engine setup
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'app_server/views'));

//// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'database')));

app.use(session({
    secret: 'akla53@#%Qtiq543uq8er^q2435',
    name: 'user',
    store: cookieStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));

app.use(require('./app_server/routes/index.js'));
app.use(require('./app_server/routes/backend.js'));
app.use(require('./app_server/routes/order.js'));
app.use(require('./app_server/routes/spot.js'));
app.use(require('./app_server/routes/speaker.js'));

app.listen(port, function () {
    console.log('--=[ SERVER STARTED ' + process.env.IP + ' ]=--');
});

module.exports = app;
