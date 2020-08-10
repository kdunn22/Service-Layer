var express = require('express');
var router = express.Router();
var db=require('../database');
router.use(express.json());


// GET Endpoint to get all users
router.get('/api/log', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('select * from worththeweight.Users', function (error, results, fields) {
    if (error) throw error;
    
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// GET Endpoint to data needed for calorie budget calculation
router.get('/api/log/budget', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('select height_feet, height_inches, weight, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) as age from worththeweight.Users where userid = 1;', function (error, results, fields) {
    if (error) throw error;
    
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// POST Endpoint to add logged foods to DB
router.post('/api/log', function(req, res, next) {
  const x = JSON.stringify(req.query.x);
  const y = JSON.stringify(req.query.y);
  const z = JSON.stringify(req.query.z);
  const q = JSON.stringify(req.query.q);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query("insert into worththeweight.Meal values(mealid, 1, " + z + ", " + x + ", " + y + ",'', 0, '', 0, " + q + ");", function (error, results, fields) {
    if (error) throw error;
  res.end("yes");
  });
});

// GET Endpoint to get weight goal and weight for weight page
router.get('/api/weight', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('select weight_goal, weight from worththeweight.Users;', function (error, results, fields) {
    if (error) throw error;
    
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// GET Endpoint to get weight goal and weight for weight page
router.get('/api/weight/trends', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('select * from worththeweight.WeightTracking order by track_date desc limit 4;', function (error, results, fields) {
    if (error) throw error;
    
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// POST Endpoint to add weight goal and weight to DB for weight page
router.post('/api/weight/goal', function(req, res, next) {
  const x = JSON.stringify(req.query.x);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  db.query("update worththeweight.Users set weight_goal =" + x + "where userid = 1;", function (error, results, fields) {
    if (error) throw error;
  res.end("yes");
  });
});

//post endpoint to add new record in weight tracking table + updating weight/weight goal
router.post('/api/weight/weight', function(req, res, next) {
  const x = JSON.stringify(req.query.x);
  const y = JSON.stringify(req.query.y);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  db.query("update worththeweight.Users set weight =" + x + "where userid = 1;", function (error, results, fields) {
    if (error) throw error;
  res.end("yes");
  });
  db.query("insert into worththeweight.WeightTracking Values(trackingid, 1," + x + ", " + y + ");", function (error, results, fields) {
    if (error) throw error;
  res.end("yes");
  });
});

// GET Endpoint to email and password from db for the user to verify login.
// ************NOTE****************
// THIS IS NOT A SECURE LOGIN
// For MVP, passwords are not encrypted in the database. 
// The user enters email and password, query pulls password from database based on entered email (done on server)
// Client side fetch calls this endpoint to get password from db for entered email
// Client side JS compares password from db to password enters and lets user enter if they match
router.get('/api/login', function(req, res, next) {
  const x = JSON.stringify(req.query.x);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('select pass_word from worththeweight.Users where email = ' + x + ';', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// POST Endpoint to create a new account
// MVP for this project is too allow login for one id (this is a test id)
// Any other accounts created can be logged into, but only data from the one test id will be shown
// Non-MVP would be writing login info to the session to know which user is actually logged in
// The account is being created in the db by creating a new entry in the users table
router.post('/api/createaccount', function(req, res, next) {
  const x = JSON.stringify(req.query.x);
  const y = JSON.stringify(req.query.y);
  const z = JSON.stringify(req.query.z);
  const q = JSON.stringify(req.query.q);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('insert into worththeweight.Users values (userid, ' + x + ', ' + y + ', ' + z + ', ' + q + ', 6, 4, 204, "m", "oh", "cool guy", "1991-10-16", 3304445345, 0, 0);', function (error, results, fields) {
    if (error) throw error;
  res.end("yes");
  });
});

module.exports = router;
