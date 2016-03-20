var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var Prison = mongoose.model('Prison');
var DI = mongoose.model('DI');
var Family = mongoose.model('Family');
var Fact = mongoose.model('Fact');
var Resource = mongoose.model('Resource');
var Country = mongoose.model('Country');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('back_resources');
});

router.get('/back-resources-modify', function(req, res, next) {
  res.render('back_resources');
});

/* REGISTER */

router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password);
  user.save(function (err) {
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()});
  });
});

/* LOGIN */


router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info) {
    if(err) { return next(err); }

    if(user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/*
  RESOURCES
*/

// get all resources
router.get('/resources', function(req, res, next) {
  Resource.find(function(err, resources){
    if(err){ return next(err); }
    res.json(resources);
  });
});

// create new resource
router.post('/resources', function(req, res, next) {
  var resource = new Resource(req.body);

  resource.save(function(err, resource){
    if(err){ return next(err); }

    res.json(resource);
  });
});

// get one resource
router.get('/resources/:resource', function(req,res){
    res.json(req.resource);
});

// delete a resource
router.delete('/resources/:resource', function(req,res){
    Resource.remove({
      _id: req.params.resource
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update a resource
router.put('/resources/:resource', function(req, res){
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

// get countries
router.get('/countries', function(req, res, next) {
  Country.find(function(err, countries){
    if(err){ return next(err); }

    res.json(countries);
  });
});

// post a new country
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

// get one coutry
router.get('/countries/:country', function(req,res){
    res.json(req.country);
});


// delete one country
router.delete('/countries/:country', function(req,res){
    Country.remove({
      _id: req.params.country
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update a country
router.put('/countries/:country', function(req, res){
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

// get all facts
router.get('/facts', function(req, res, next) {
  Fact.find(function(err, facts){
    if(err){ return next(err); }

    res.json(facts);
  });
});

// get one fact
router.get('/facts/:fact', function(req,res){
    res.json(req.fact);
});

// post a new fact
router.post('/facts', function(req, res, next) {
  var fact = new Fact(req.body);

  fact.save(function(err, fact){
    if(err){ return next(err); }

    res.json(fact);
  });
});

// delete one fact
router.delete('/facts/:fact', function(req,res){
    Fact.remove({
      _id: req.params.fact
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update one fact
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

// get all families
router.get('/families', function(req, res, next) {
  Family.find(function(err, families){
    if(err){ return next(err); }

    res.json(families);
  });
});

// get one family
router.get('/families/:family', function(req,res){
  req.family.populate('prisons', function(err, family) {
      if(err){ return next(err); }
          res.json(req.family);
    });
});

// create a new family
router.post('/families', function(req, res, next) {
  var family = new Family(req.body);

  family.save(function(err, family){
    if(err){ return next(err); }

    res.json(family);
  });
});

// delete one family
router.delete('/families/:family', function(req,res){
    Family.remove({
      _id: req.params.family
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update one family
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

// add prisons to family
router.put('/families/:family/prisons/', function(req, res){
  Family.findByIdAndUpdate(
        req.body.id,
        {$push: {'prisons': req.body.prison}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
});

// Directions

// get all interregional directions
router.get('/dirs', function(req, res, next) {
  DI.find(function(err, dirs){
    if(err){ return next(err); }

    res.json(dirs);
  });
});

// get one interregional direction
router.get('/dirs/:dir', function(req,res){
  req.dir.populate('prisons', function(err, post) {
      if(err){ return next(err); }
          res.json(req.dir);
    });
});

// create a new interregional direction
router.post('/dirs', function(req, res, next) {
  var dir = new DI(req.body);
  dir.save(function(err, dir){
    if(err){ return next(err); }

    res.json(dir);
  });
});

// delete one interregional direction
router.delete('/dirs/:dir', function(req,res){
    DI.remove({
      _id: req.params.dir
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update one interregional direction
router.put('/dirs/:dir', function(req, res){
  DI.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      coordinates: req.body.coordinates,
      population_by_year: {
        year: req.body.population_by_year.year,
        population: req.body.population_by_year.population,
        density: req.body.population_by_year.density,
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

// update prisons in interregional directions
router.put('/dirs/:dir/prisons/', function(req, res){
  DI.findByIdAndUpdate(
        req.body.id,
        {$push: {'prisons': req.body.prison}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
});

// Prisons

// get all prisons
router.get('/prisons', function(req, res, next) {
  Prison.find(function(err, prisons){
    if(err){ return next(err); }
    res.json(prisons);
  });
});

// get one prison
router.get('/prisons/:prison', function(req,res){
  var opts = [
    {path: 'family', model:'Family'},
    {path: 'interregional_direction', model:'DI'}
  ];
    req.prison.populate(opts, function(err, prison){
      if(err){ return next(err); }
          res.json(req.prison);
    });
});

// create new prison
router.post('/prisons', function(req, res, next) {
  var prison = new Prison(req.body);
  prison.save(function(err, dir){
    if(err){ return next(err); }

    res.json(prison);
  });
});

// delete one prison
router.delete('/prisons/:prison', function(req,res){
    Prison.remove({
      _id: req.params.prison
    },
    function (err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Deleted' });
        });
});

// update a prison
router.put('/prisons/:prison', function(req, res){
  Prison.update({ _id: req.body.id},{
    $set: {
      name: req.body.name,
      adress: req.body.adress,
      coordinates: {x: req.body.coordinates.x , y: req.body.coordinates.y},
      interregional_direction: req.body.interregional_direction,
      population: req.body.population,
      density: req.body.density,
      family: req.body.family,
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
