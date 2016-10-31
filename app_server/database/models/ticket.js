var mysql = require('./../db.js');
var bcrypt = require('bcrypt-node');

var Ticket = function () {};

Ticket.new = function(order, lastid, callback) {
    console.log('--=[ TICKET INSERT:');
    var query =
        "INSERT INTO `tickets` VALUES(null,?,?,?)";
    for (var i = 0; i < order.ticket.amount; i++) {
        ticketHash(new Date(), function (err, hashcode) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            mysql.connection(function (err, conn) {
                if (err) {
                    console.log('     FAILED! ]=--');
                    return callback(err, null);
                }
                conn.query(query, [order.ticket.type, hashcode, lastid], function (err, result) {
                    if (err) {
                        console.log('     FAILED! ]=--');
                        return callback(err, null);
                    }

                    console.log('     SUCCESS! ]=--');
                    return callback(null, hashcode);
                })
            })
        });
    }
};

Ticket.findBy = function(obj, callback) {
    var query =
        "SELECT *, " +
        "`ticket_type`.`id` AS `type_id` " +
        "FROM `tickets` " +
        "INNER JOIN `ticket_type` ON `tickets`.`ticket_type` = `ticket_type`.`id` " +
        "WHERE ";

    var i = 0;
    var empty = true;
    for (var key in obj) {
        empty = false;
        if (obj.hasOwnProperty(key)) {
            if (i == 0) {
                var id = '';
                if (key == 'id') {
                    id = 'tickets`.`id';
                    query += "`" + id + "`" + " = " + "'" + obj[key] + "'";
                } else {
                    query += "`" + key + "`" + " = " + "'" + obj[key] + "'";
                }
            } else {
                var id = '';
                if (key == 'id') {
                    id = 'tickets`.`id';
                    query += " OR " + "`" + id + "`" + " = " + "'" + obj[key] + "'";
                } else {
                    query += " OR " + "`" + key + "`" + " = " + "'" + obj[key] + "'";
                }

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

var ticketHash = function (param, callback) {
    var SALT_FACTOR = 5;
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return callback(err, null);
        }
        bcrypt.hash(param, salt, null, function (err, hash) {
            if (err) {
                return callback(err, null);
            }

            return callback(null, hash);
        })
    })
};

module.exports = Ticket;