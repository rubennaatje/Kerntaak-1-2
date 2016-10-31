var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'securees5.sgcpanel.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'zakelijk@mauritsversluis.nl',
        pass: 'Tr3in3n97'
    }
};

module.exports.transporter = nodemailer.createTransport(smtpConfig);