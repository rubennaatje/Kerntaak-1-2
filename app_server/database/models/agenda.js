var mysql = require('./../db.js');

var Agenda = function () {};

Agenda.getAll = function (callback) {
    console.log('--=[ AGENDA GETALL:');
    var query =
        "SELECT *, " +
        "`spot`.`id` AS `spot_id`, " +
        "`speaker`.`id` AS `speaker_id`, " +
        "`hall`.`id` AS `hall_id` " +
        "FROM `agenda` " +
        "INNER JOIN `spot` ON `agenda`.`spot` = `spot`.`id` " +
        "INNER JOIN `speaker` ON `agenda`.`speaker` = `speaker`.`id` " +
        "INNER JOIN `hall` ON `spot`.`hall` = `hall`.`id` " +
        "ORDER BY `spot`.`start_time` ASC";
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

Agenda.new = function (obj, callback) {
    console.log('--=[ AGENDA INSERT:');
    var query = "INSERT INTO `agenda` VALUES(null, ?,?,?,?,?)";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.assign_choice, obj.speaker, obj.subject, obj.sub_desc, obj.extra_wishes], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

module.exports = Agenda;