var mysql = require('./../db.js');

var Budget = function () {};

Budget.getAll = function(callback) {
    console.log('--=[ DELETING OLD REQUESTS:');
    var querydelete = "DELETE FROM `budget_request` WHERE `date` < (NOW() - INTERVAL 3 DAY) AND `accepted` = 0 AND `countered` = 1;";
    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(querydelete, function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }
            console.log('     SUCCESS! ]=--');
        })
    });

    console.log('--=[ BUDGET REQUESTS GETALL:');
    var query = "SELECT *, `budget_request`.`id` AS `request_id`, `speaker`.`id` AS `speaker_id` FROM `budget_request` INNER JOIN `speaker` ON `budget_request`.`speaker` = `speaker`.`id` WHERE `accepted` = 0 AND `countered` = 0 ORDER BY `budget_request`.`date` DESC";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, function (err, requests) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, requests);
        })
    })
};

Budget.findBy = function(obj, callback) {
    var query =
        "SELECT *, `budget_request`.`id` AS `request_id`, `speaker`.`id` AS `speaker_id` FROM `budget_request` INNER JOIN `speaker` ON `budget_request`.`speaker` = `speaker`.`id` WHERE ";

    var i = 0;
    var empty = true;
    for (var key in obj) {
        empty = false;
        if (obj.hasOwnProperty(key)) {
            if (i == 0) {
                var id = '';
                if (key == 'id') {
                    id = 'budget_request`.`id';
                    query += "`" + id + "`" + " = " + "'" + obj[key] + "'";
                } else {
                    query += "`" + key + "`" + " = " + "'" + obj[key] + "'";
                }
            } else {
                var id = '';
                if (key == 'id') {
                    id = 'budget_request`.`id';
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

Budget.new = function (obj, callback) {
    console.log('--=[ SUBMITTING BUDGET REQUEST:');
    var query = "INSERT INTO `budget_request` VALUES(null,?,?,?, NOW(),0,0)";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.speaker_id, obj.reason, obj.requested_budget], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

Budget.accept = function(obj, callback) {
    console.log('--=[ ACCEPTING BUDGET REQUEST:');
    var query = "UPDATE `budget_request` SET `accepted` = 1 WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.id], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

Budget.reject = function(obj, callback) {
    console.log('--=[ REJECTING BUDGET REQUEST:');
    var query = "UPDATE `budget_request` SET `requested_budget` = ?, `countered` = 1 WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.counteramount, obj.id], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

Budget.delete = function(obj, callback) {
    console.log('--=[ DELETING BUDGET REQUEST:');
    var query = "DELETE FROM `budget_request` WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.id], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

module.exports = Budget;