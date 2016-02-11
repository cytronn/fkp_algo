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
  res.render('back_resources', console.log('hello world'));
});

/* POST TO RESOURCES*/

router.get('/resources', function(req, res, next) {
  Resource.find(function(err, resources){
    if(err){ return next(err); }

    res.json(resources);
  });
});

router.post('/resources', function(req, res, next) {
  var resource = new Resource(req.body);

  resource.save(function(err, resource){
    if(err){ return next(err); }

    res.json(resource);
  });
});

module.exports = router;
