var mysql = require("mysql");
//Database connection
var conn = mysql.createConnection({
		host     : 'worththewght.cka0jgy49r3o.us-east-1.rds.amazonaws.com',
		user     : 'admin',
		password : 'Softball44!',
		database : 'worththeweight'
	});
	conn.connect(function(err) {
        if (err) throw err;
    });
module.exports = conn;