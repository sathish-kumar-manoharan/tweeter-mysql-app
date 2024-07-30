
var mysql = require('mysql');

var dbConnection = mysql.createConnection({
    host:'localhost',
    user:'tweeter',
    password:'tweeter@123',
    database:'tweeter'
});

exports.ping  = function(req, res) {
    res.send('SUCCESS');
};

exports.getUser  = function(req, res) {
    var sql = "SELECT * FROM user WHERE userName = ?";
    var values = [[ req.params.lastName ]];
    dbConnection.query(sql,[values], function (error, result) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records inserted: " + result.affectedRows);
        return res.status(200).json(result[0]);
    });
};

exports.createUser  = function(req, res) {
    var sql = "INSERT INTO user (userName, age, gender, email) VALUES ?";
    var values = [[ req.body.userName, req.body.age, req.body.sex, req.body.email]];
    dbConnection.query(sql,[values], function (error, result) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records inserted: " + result.affectedRows);
        return res.status(200).json();
    });
};

exports.postMessage  = function(req, res) {
    var sql = "INSERT INTO messages (userName, content) VALUES ?";
    var values = [[ req.body.userName, req.body.content]];
    dbConnection.query(sql,[values], function (error, result) {
      if (error){
        return res.status(500).json(error);
      };
      console.log("Number of records inserted: " + result.affectedRows);
      return res.status(200).json();
    });
};

exports.getMessages  = function(req, res) {
    var sql = "SELECT content from messages Where userName = " + mysql.escape(req.params.userName);
    dbConnection.query(sql, function (error, result, fields) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records retrieved : " + result);
        return res.status(200).json(result);
    });
};

/**
 * This function is used to add an entry in the following table and
 * deletes duplicate entry if any, since there is no way to add foreign key constraint
 * for followingUserName, we are taking care of duplicates on the code.
 * @param {*} req 
 * @param {*} res 
 */
exports.followUser  = function(req, res) {
    var sql = "INSERT INTO following (userName, followingUserName) VALUES ? ";
    var values = [[ req.params.followUserName, req.params.userName ]];
    var deleteSQL = "DELETE FROM following WHERE userName = "+ mysql.escape(req.params.followUserName) +
                    "AND followingUserName =" + mysql.escape(req.params.userName);
    dbConnection.query(deleteSQL, function(delErr, delresult){
        if (delErr){
            return res.status(500).json(error);
        };
        console.log("Deleted the duplicated records...");
    });
    dbConnection.query(sql, [values], function (error, result) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records retrieved : " + result);
        return res.status(200).json();
    });
};

exports.unfollowUser  = function(req, res) {
    var sql = "DELETE FROM following WHERE userName = "+ mysql.escape(req.params.followUserName) +
              " AND followingUserName =" + mysql.escape(req.params.userName);
    dbConnection.query(sql, function (error, result, fields) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records retrieved : " + result);
        return res.status(200).json();
    });
};

exports.getConnections  = function(req, res) {
    var followingUsersSql = "SELECT * FROM following WHERE followingUserName = "+ mysql.escape(req.params.userName) +
                            "OR userName =" + mysql.escape(req.params.userName);
    dbConnection.query(followingUsersSql, function (error, result, fields) {
        if (error){
        return res.status(500).json(error);
        };
        console.log("Number of records retrieved : " + result);
        var followers = result.filter( item => item.userName == req.params.userName).map( aitem => aitem.followingUserName );
        var following = result.filter( item => item.followingUserName == req.params.userName).map( aitem => aitem.userName );
        var connections = {
          following :  following,
          followers : followers
        };
        return res.status(200).json(connections);
    });
};

exports.getMostPopularFollower  = function(req, res) {
    var followersSql = "SELECT followingUserName FROM following WHERE userName = "+ mysql.escape(req.params.userName);
    dbConnection.query(followersSql, function (error, result) {
        if (error){
            return res.status(500).json(error);
        };

        var followers = result.map( aitem => aitem.followingUserName );
        dbConnection.query( "SELECT * FROM (SELECT username, count(*) AS count FROM following WHERE userName IN ('"+ followers.join("','") +
                            "') GROUP BY userName asc) as t WHERE 1=1 HAVING t.count = MAX(t.count)", function(error, result) {
            if(error){
                console.log(error);
                return res.status(500).json(error);
            }
    
            return res.status(200).json(result[0]);
        });
    });
   
};