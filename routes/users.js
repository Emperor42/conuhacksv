var express = require('express');
var router = express.Router();
var fs = require("fs");

/* post users listing. */
router.post('/claim', function(req, res, next) {
  console.log("claim");
  res.redirect('/'); 
});

/* post users listing. */
router.post('/stop', function(req, res, next) {
  console.log("stop");
  res.redirect('/');
});

module.exports = router;
