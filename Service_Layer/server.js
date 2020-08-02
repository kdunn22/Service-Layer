
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "worththewght.cka0jgy49r3o.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Softball44!"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    con.query("select * from worththeweight.Users;", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
})
