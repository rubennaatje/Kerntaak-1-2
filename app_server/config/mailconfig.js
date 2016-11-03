var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'securees5.sgcpanel.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'conference@mauritsversluis.nl',
        pass: 'conferenceMail!'
    }
};

module.exports.transporter = nodemailer.createTransport(smtpConfig);