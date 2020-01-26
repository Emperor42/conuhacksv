var express = require('express');
var router = express.Router();
var fs = require("fs");

const dbURI  = "mongodb+srv://Dev:devPassword@conuhacks-g1c1s.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require("mongoose");


const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/Task");


/* post users listing. */
router.post('/claim', function(req, res, next) {
  console.log("claim");
});

/* get users listing. */
router.post('/stop', function(req, res, next) {
  console.log("stop");
});

//some of the user api and such
/* post users listing. */
router.post('/task/create', function(req, res, next) {
  console.log("Create Task, displays body which should be usable as is");
  console.log(req.body);
  res.redirect('/admin');
});

router.post('/task/remove', function(req, res, next) {
  console.log("Remove Task");
  console.log(req.body['id']);
  res.redirect('/admin');
});

router.post('/task/edit', function(req, res, next) {
  console.log("Edit Task");
  console.log(req.body);
  res.redirect('/admin');
});

router.post('/user/stats', function(req, res, next) {
  console.log("Pull User Stats");
  console.log(req.body['query']);
  res.redirect('/admin');
});

router.post('/user/edit', function(req, res, next) {
  console.log("Edit User");
  console.log(req.body);
  res.redirect('/admin');
});

router.post('/user/create', function(req, res, next) {
  console.log("Create User");
  console.log(req.body);
  res.redirect('/admin');
});

router.post('/user/remove', function(req, res, next) {
  console.log("Remove User");
  console.log(req.body['id']);
  res.redirect('/admin');
});

module.exports = router;
