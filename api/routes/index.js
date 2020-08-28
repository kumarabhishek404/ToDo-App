var express = require('express');
const data = require('../controllers/dataInsert')
const path = require('path');
var router = express.Router();

router.get("/", (req, res) => {
    res.send('hii kese ho')
});

module.exports = router;
