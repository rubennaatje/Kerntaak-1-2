var mysql = require('./../db.js');
var bcrypt = require('bcrypt-node');

var Meal = function () {};

Meal.new = function(order, lastid, callback) {
    console.log('--=[ MEAL INSERT:');
    var query =
        "INSERT INTO `meal` VALUES(null,?,?,?)";
    for (var i = 0; i < order.meal.amount; i++) {
        mealHash(new Date(), function (err, hashcode) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            mysql.connection(function (err, conn) {
                if (err) {
                    console.log('     FAILED! ]=--');
                    return callback(err, null);
                }
                conn.query(query, [order.meal.type, hashcode, lastid], function (err, result) {
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

Meal.findBy = function(obj, callback) {
    var query =
        "SELECT *, " +
        "`meal_type`.`id` AS `type_id` " +
        "FROM `meal` " +
        "INNER JOIN `meal_type` ON `meal`.`meal_type` = `meal_type`.`id` " +
        "WHERE ";

    var i = 0;
    var empty = true;
    for (var key in obj) {
        empty = false;
        if (obj.hasOwnProperty(key)) {
            if (i == 0) {
                var id = '';
                if (key == 'id') {
                    id = 'meal_type`.`id';
                    query += "`" + id + "`" + " = " + "'" + obj[key] + "'";
                } else {
                    query += "`" + key + "`" + " = " + "'" + obj[key] + "'";
                }
            } else {
                var id = '';
                if (key == 'id') {
                    id = 'meal_type`.`id';
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

var mealHash = function (param, callback) {
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

module.exports = Meal;