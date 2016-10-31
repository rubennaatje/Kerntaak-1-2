var mysql = require('./../db.js');

var Speaker = function () {};

Speaker.new = function(obj, callback) {
    console.log('--=[ SPEAKER INSERT');
    var query =
        "INSERT INTO `speaker` VALUES(null, ?,?,?,?,?,?,?,?,?, 0)";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, obj, function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result.insertId);
        })
    })
};

Speaker.assignBudget = function(obj, callback) {
    console.log('--=[ SPEAKER ASSIGN BUDGET');
    var query =
        "UPDATE `speaker` SET `budget` = ? WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.budget, obj.speaker_id], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

module.exports = Speaker;