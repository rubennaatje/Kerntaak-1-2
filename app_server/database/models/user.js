var mysql = require('./../db.js');
var bcrypt = require('bcrypt-node');

var User = function () {};

User.login = function (object, callback) {
    var user_salt = '';
    var hashed_password = '';
    var query =
        "SELECT `username`, " +
        "`firstname`, " +
        "`infix`, " +
        "`lastname`, " +
        "`email` " +
        "FROM `moderator` " +
        "WHERE `email` = ? " +
        "AND `password` = ?";

    var selectSalt = "SELECT `salt` FROM `moderator` WHERE `email` = ?";
    mysql.connection(function (err, conn) {
        if (err) {
            return callback(err, null);
        }

        conn.query(selectSalt, [object.email], function (err, salt) {
            if (err) {
                return callback(err, null);
            }
            if (salt.length <= 0) {
                return callback('not_exists', null);
            }
            user_salt = salt[0].salt;
            hashPassword(object.password, user_salt, function (errHash, hashed) {
                if (errHash) {
                    return callback(errHash, null);
                }
                hashed_password = hashed;
            });

            mysql.connection(function (errSql, conn) {
                if (errSql) {
                    return callback(errSql, null);
                }
                conn.query(query, [object.email, hashed_password], function (errQuery, user) {
                    if (errQuery) {
                        return callback(errQuery, null);
                    } else if (user.length  <= 0) {
                        return callback('login_wrong_pass', null);
                    } else {
                        return callback(null, user[0]);
                    }
                })
            })
        });
    });
};

var hashPassword = function (param, user_salt, callback) {
    var SALT_FACTOR = 5;
    if (user_salt) {
        bcrypt.hash(param, user_salt, null, function (err, hash) {
            if (err) {
                return callback(err, null);
            }
            wachtwoord = hash;

            return callback(null, wachtwoord);
        })
    } else {
        bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
            if (err) {
                return callback(err, null);
            }
            bcrypt.hash(param, salt, null, function (err, hash) {
                if (err) {
                    return callback(err, null);
                }
                wachtwoord = hash;

                return callback(null, wachtwoord, salt);
            })
        })
    }
};

module.exports = User;