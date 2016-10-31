var mysql = require('./../db.js');

var Ticket_type = function () {};

Ticket_type.getAll = function (callback) {
    console.log('--=[ TICKET_TYPE GETALL:');
    var query =
        "SELECT * FROM `ticket_type`";
    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, function (err, ticket) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, ticket);
        })
    })
};

Ticket_type.findBy = function(obj, callback) {
    var query =
        "SELECT * FROM `ticket_type` WHERE ";

    var i = 0;
    var empty = true;
    for (var key in obj) {
        empty = false;
        if (obj.hasOwnProperty(key)) {
            if (i == 0) {
                query += "`" + key + "`" + " = " + "'" + obj[key] + "'";
            } else {
                query += " OR " + "`" + key + "`" + " = " + "'" + obj[key] + "'";
            }
        }
        i++;
    }

    if (empty) {
        query += "1 = 1";
    }
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err, null);
        }

        conn.query(query, function (err, rows) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, rows);
        })
    });
};

Ticket_type.parse_partout = function(order, callback) {
    console.log('--=[ PARTOUT PARSER:');
    var query =
        "UPDATE `ticket_type` SET `available` = `available` - ? WHERE `id` != 4";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }

        conn.query(query, [order], function (err, rows) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            console.log('     SUCCESS! ]=--');
            console.log(rows);
            return callback(null, rows);
        })
    });
};

module.exports = Ticket_type;