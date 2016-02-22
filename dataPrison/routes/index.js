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
  res.render('back_resources');
});

router.get('/back-resources-modify', function(req, res, next) {
  res.render('back_resources');
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



router.param('resource', function(req, res, next, id) {
  var query = Resource.findById(id);

  query.exec(function (err, resource){
    if (err) { return next(err); }
    if (!resource) { return next(new Error("can't find the resource")); }

    req.resource = resource;
    return next();
  });
});


router.get('/resources/:resource', function(req,res){
    res.json(req.resource);
});


router.delete('/resources/:resource', function(req,res){
    console.log(req.params.resource);
    Resource.remove({
      _id: req.params.resource
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});


module.exports = router;
