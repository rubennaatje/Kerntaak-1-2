var mysql = require('./../db.js');

var Meal_type = function () {};

Meal_type.getAll = function (callback) {
    console.log('--=[ MEAL_TYPE GETALL:');
    var query =
        "SELECT * FROM `meal_type`";
    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, function (err, meals) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, meals);
        })
    })
};

Meal_type.findBy = function(obj, callback) {
    var query =
        "SELECT * FROM `meal_type` WHERE ";

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
            console.log(rows);
            return callback(null, rows);
        })
    });
};

module.exports = Meal_type;