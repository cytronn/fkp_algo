var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Prison = mongoose.model('Prison');
var DI = mongoose.model('DI');
var Family = mongoose.model('Family');
var Fact = mongoose.model('Fact');
var Resource = mongoose.model('Resource');
var Country = mongoose.model('Country');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('back', console.log('hello world'));
});

module.exports = router;
