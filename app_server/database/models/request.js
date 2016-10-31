var mysql = require('./../db.js');

var Request = function () {
};

Request.getAll = function (callback) {
    var query =
        "SELECT *," +
        "`request`.`id` AS `request_id`, " +
        "`speaker`.`id` AS `speaker_id`, " +
        "`s1`.`id` AS `s1_id`, " +
        "`s2`.`id` AS `s2_id`, " +
        "`s3`.`id` AS `s3_id`, " +
        "`s1`.`start_time` AS `s1_st`, " +
        "`s2`.`start_time` AS `s2_st`, " +
        "`s3`.`start_time` AS `s3_st`, " +
        "`s1`.`end_time` AS `s1_et`, " +
        "`s2`.`end_time` AS `s2_et`, " +
        "`s3`.`end_time` AS `s3_et`, " +
        "`h1`.`id` AS `h1_id`, " +
        "`h2`.`id` AS `h2_id`, " +
        "`h3`.`id` AS `h3_id`, " +
        "`h1`.`name` AS `h1_name`, " +
        "`h2`.`name` AS `h2_name`, " +
        "`h3`.`name` AS `h3_name`, " +
        "`t1`.`id` AS `t1_id`, " +
        "`t2`.`id` AS `t2_id`, " +
        "`t3`.`id` AS `t3_id`, " +
        "`t1`.`title` AS `t1_title`, " +
        "`t2`.`title` AS `t2_title`, " +
        "`t3`.`title` AS `t3_title` " +
        "FROM `request` " +
        "INNER JOIN `speaker` ON `request`.`speaker` = `speaker`.`id` " +
        "INNER JOIN `spot` AS `s1` ON `request`.`spot_first` = `s1`.`id` " +
        "INNER JOIN `spot` AS `s2` ON `request`.`spot_second` = `s2`.`id` " +
        "INNER JOIN `spot` AS `s3` ON `request`.`spot_third` = `s3`.`id` " +
        "INNER JOIN `hall` AS `h1` ON `s1`.`hall` = `h1`.`id` " +
        "INNER JOIN `hall` AS `h2` ON `s2`.`hall` = `h2`.`id` " +
        "INNER JOIN `hall` AS `h3` ON `s3`.`hall` = `h3`.`id` " +
        "INNER JOIN `taken_type` AS `t1` ON `s1`.`taken` = `t1`.`id` " +
        "INNER JOIN `taken_type` AS `t2` ON `s2`.`taken` = `t2`.`id` " +
        "INNER JOIN `taken_type` AS `t3` ON `s3`.`taken` = `t3`.`id` ";
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

Request.new = function (obj, callback) {
    console.log('--=[ REQUEST INSERT:');
    var query =
        "INSERT INTO `request` VALUES(null,?,?,?,?,?,?,?)";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [obj.speaker, obj.subject, obj.sub_desc, obj.extra_wishes, obj.spot_first, obj.spot_second, obj.spot_third], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result.insertId);
        })
    })
};

Request.delete = function (id, callback) {
    console.log('--=[ REQUEST DELETE:');
    var query =
        "DELETE FROM `request` WHERE `id` = ?";

    mysql.connection(function (err, conn) {
        if (err) {
            console.log('     FAILED! ]=--');
            return callback(err, null);
        }
        conn.query(query, [id], function (err, result) {
            if (err) {
                console.log('     FAILED! ]=--');
                return callback(err, null);
            }

            console.log('     SUCCESS! ]=--');
            return callback(null, result);
        })
    })
};

module.exports = Request;