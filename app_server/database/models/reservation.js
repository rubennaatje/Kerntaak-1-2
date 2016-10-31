var mysql = require('./../db.js');

var Reservation = function () {};

Reservation.new = function(user, callback) {
    console.log('--=[ RESERVATION INSERT:');
    var infix = null;
    var query =
        "INSERT INTO `reservation` VALUES(null,?,?,?,?, NOW())";

    if(user.infix) {
        infix = user.infix;
    }

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [user.firstname, infix, user.lastname, user.email], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result.insertId);
        })
    })
};


module.exports = Reservation;