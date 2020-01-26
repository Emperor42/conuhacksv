var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name:"matthew", points: "0" });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Express', name:"matthew", points: "0" });
});

module.exports = router;
