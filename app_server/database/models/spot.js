var mysql = require('./../db.js');

var Spot = function () {
};

Spot.getAll = function (callback) {
    console.log('--=[ SPOT GETALL:');
    var query =
        "SELECT *, " +
        "`spot`.`id` AS `spot_id`, " +
        "`hall`.`id` AS `hall_id`, " +
        "`hall`.`name` AS `hall_name`, " +
        "`taken_type`.`id` AS `taken_id`, " +
        "`taken_type`.`title` AS `taken_title` " +
        "FROM `spot` " +
        "INNER JOIN `hall` ON `spot`.`hall` = `hall`.`id` " +
        "INNER JOIN `taken_type` ON `spot`.`taken` = `taken_type`.`id` " +
        "WHERE `spot`.`taken` != 1 " +
        "ORDER BY `start_time` ASC";
    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, function (err, agenda) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, agenda);
        })
    })
};

Spot.parseRequest = function (obj, callback) {
    console.log('--=[ SPOT REQUEST PARSER:');
    var query =
        "UPDATE `spot` SET `taken` = 2 WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj], function (err, agenda) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, agenda);
        })
    })
};

Spot.parseAssign = function (obj, callback) {
    console.log('--=[ SPOT ASSIGN PARSER:');
    var query =
        "UPDATE `spot` SET `taken` = 1 WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj], function (err, agenda) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, agenda);
        })
    })
};

module.exports = Spot;