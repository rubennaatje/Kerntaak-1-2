var mysql = require('./../db.js');

var Moderator = function () {};

Moderator.getBudget = function(callback) {
    console.log('--=[ GET BUDGET:');
    var query = "SELECT `budget` FROM `moderator`";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, function (err, budget) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            console.log('     SUCCESS! ]=--');
            return callback(null, budget[0].budget);
        })
    })
};

Moderator.updateBudget = function(obj, callback) {
    console.log('--=[ UPDATE BUDGET:');
    var query = "UPDATE `moderator` SET `budget` = `budget` - ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.budget], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

module.exports = Moderator;