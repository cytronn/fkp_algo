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


/*
  RESOURCES
*/

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

router.put('/resources/:resource', function(req, res){
  console.log(req.body.name);
  Resource.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
     link: req.body.link,
    }
  },
  function (err) {
    if (err) return res.send(err);
    res.json({
      message: 'Updated'
    });
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

/*
COUNTRIES
*/

router.get('/countries', function(req, res, next) {
  Country.find(function(err, countries){
    if(err){ return next(err); }

    res.json(countries);
  });
});

router.post('/countries', function(req, res, next) {
  var country = new Country(req.body);

  country.save(function(err, country){
    if(err){ return next(err); }

    res.json(country);
  });
});

router.param('country', function(req, res, next, id) {
  var query = Country.findById(id);

  query.exec(function (err, country){
    if (err) { return next(err); }
    if (!country) { return next(new Error("can't find the country")); }

    req.country = country;
    return next();
  });
});

router.get('/countries/:country', function(req,res){
    res.json(req.country);
});


router.delete('/countries/:country', function(req,res){
    Country.remove({
      _id: req.params.country
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

router.put('/countries/:country', function(req, res){
  console.log(req.body.name);
  Country.update({ _id: req.body.id},{
    $set: {
     code: req.body.code,
     name: req.body.name,
     rate: req.body.rate,
}
},
function(err) {
  if (err) return res.send(err);
  res.json({
    message: 'updated'
  });
});
});



/* FACTS */

router.get('/facts', function(req, res, next) {
  Fact.find(function(err, facts){
    if(err){ return next(err); }

    res.json(facts);
  });
});

router.get('/facts/:fact', function(req,res){
    console.log(req.fact);
    res.json(req.fact);
});

router.post('/facts', function(req, res, next) {
  var fact = new Fact(req.body);

  fact.save(function(err, fact){
    if(err){ return next(err); }

    res.json(fact);
  });
});

router.delete('/facts/:fact', function(req,res){
    console.log(req.params.fact);
    Fact.remove({
      _id: req.params.fact
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

router.put('/facts/:fact', function(req, res){
  Fact.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      date: req.body.date,
      description : req.body.description,
    }
  },
  function (err) {
    if (err) return res.send(err);
    res.json({
      message: 'Updated'
    });
  });
});

router.param('fact', function(req, res, next, id) {
  var query = Fact.findById(id);

  query.exec(function (err, fact){
    if (err) { return next(err); }
    if (!fact) { return next(new Error("can't find the resource")); }

    req.fact = fact;
    return next();
  });
});

/* Families */

router.get('/families', function(req, res, next) {
  Family.find(function(err, families){
    if(err){ return next(err); }

    res.json(families);
  });
});

router.get('/families/:family', function(req,res){
    console.log(req.family);
    res.json(req.family);
});

router.post('/families', function(req, res, next) {
  var family = new Family(req.body);

  family.save(function(err, family){
    if(err){ return next(err); }

    res.json(family);
  });
});

router.delete('/families/:family', function(req,res){
    console.log(req.params.family);
    Family.remove({
      _id: req.params.family
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

router.put('/families/:family', function(req, res){
  Family.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      definition: req.body.definition,
    }
  },
  function (err) {
    if (err) return res.send(err);
    res.json({
      message: 'Updated'
    });
  });
});

router.param('family', function(req, res, next, id) {
  var query = Family.findById(id);

  query.exec(function (err, family){
    if (err) { return next(err); }
    if (!family) { return next(new Error("can't find the resource")); }

    req.family = family;
    return next();
  });
});

// Directions

router.get('/dirs', function(req, res, next) {
  DI.find(function(err, dirs){
    if(err){ return next(err); }

    res.json(dirs);
  });
});

router.get('/dirs/:dir', function(req,res){
    res.json(req.dir);
});

router.post('/dirs', function(req, res, next) {
  var dir = new DI(req.body);
  dir.save(function(err, dir){
    if(err){ return next(err); }

    res.json(dir);
  });
});

router.delete('/dirs/:dir', function(req,res){
    DI.remove({
      _id: req.params.dir
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});


router.put('/dirs/:dir', function(req, res){
  DI.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      coordinates: req.body.coordinates,
      population_by_year: {
        year: req.body.population_by_year.year,
        population: req.body.population_by_year.population,
      },
}
},
function(err) {
  if (err) return res.send(err);
  res.json({
    message: 'updated'
  });
});
});

router.param('dir', function(req, res, next, id) {
  var query = DI.findById(id);

  query.exec(function (err, dir){
    if (err) { return next(err); }
    if (!dir) { return next(new Error("can't find the DI")); }

    req.dir = dir;
    return next();
  });
});

// Prisons

router.get('/prisons', function(req, res, next) {
  Prison.find(function(err, prisons){
    if(err){ return next(err); }
    res.json(prisons);
  });
});

router.get('/prisons/:prison', function(req,res){
    res.json(req.prison);
});

router.post('/prisons', function(req, res, next) {
  var prison = new Prison(req.body);
  prison.save(function(err, dir){
    if(err){ return next(err); }

    res.json(prison);
  });
});

router.delete('/prisons/:prison', function(req,res){
    Prison.remove({
      _id: req.params.prison
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});


router.put('/prisons/:prison', function(req, res){
  Prison.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      coordinates: {x: req.body.coordinates.x , y: req.body.coordinates.y},
      interregional_direction: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'DI'
      },
      population: req.body.population,
      density: req.body.density,
      family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DI'
      },
}
},
function(err) {
  if (err) return res.send(err);
  res.json({
    message: 'updated'
  });
});
});

router.param('prison', function(req, res, next, id) {
  var query = Prison.findById(id);

  query.exec(function (err, prison){
    if (err) { return next(err); }
    if (!prison) { return next(new Error("can't find the Prison")); }

    req.prison = prison;
    return next();
  });
});

module.exports = router;
