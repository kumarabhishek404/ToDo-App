var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("ABHI");
  res.send('Abhishek');
});

module.exports = router;
