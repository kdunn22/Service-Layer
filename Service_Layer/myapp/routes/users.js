var express = require('express');
var router = express.Router();
var db=require('../database');
router.use(express.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.query('select * from worththeweight.Users', function (error, results, fields) {
    if (error) throw error;
    
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

router.post('/', function(req, res, next) {
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


module.exports = router;
