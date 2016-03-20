var app = angular.module('dataPrison', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('back', {
        url: '/back',
        templateUrl: '/back.html',
        controller: 'MainCtrl',
        resolve: {},
      })

    // RESOURCES

    // create a resource
    .state('addResource', {
      url: '/back/create-resource',
      templateUrl: '/resource-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

    // get all resources
    .state('resources', {
      url: '/back/resources',
      templateUrl: '/resources.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['resources', function(resources) {
          return resources.getAll();
        }]
      },
    })

    // update a resource
    .state('updateResource', {
      url: '/back/resources/:id',
      templateUrl: '/resource.html',
      controller: 'resourceCtrl',
      resolve: {
        resource: ['$stateParams', 'resources', function($stateParams, resources) {
          return resources.get($stateParams.id);
        }]
      },
    })

    // COUNTRIES
    // get all countries
    .state('countries', {
      url: '/back/countries',
      templateUrl: '/countries.html',
      controller: 'countriesCtrl',
      resolve: {
        countryPromise: ['countries', function(countries) {
          return countries.getAll();
        }]
      },
    })
    // create a country
    .state('addCountry', {
      url: '/back/create-country',
      templateUrl: '/country-create.html',
      controller: 'countriesCtrl',
      resolve: {},
    })

    // update a country
    .state('updateCountry', {
      url: '/back/countries/:id',
      templateUrl: '/country.html',
      controller: 'countryCtrl',
      resolve: {
        country: ['$stateParams', 'countries', function($stateParams, countries) {
          return countries.get($stateParams.id);
        }]
      },
    })

    // FACTS

    // get all facts
    .state('facts', {
      url: '/back/facts',
      templateUrl: '/facts.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['facts', function(facts) {
          return facts.getAll();
        }]
      },
    })

    // create a fact
    .state('addFact', {
      url: '/back/fact-create',
      templateUrl: '/fact-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

    // update a fact
    .state('updateFact', {
      url: '/facts/:id',
      templateUrl: '/fact.html',
      controller: 'factCtrl',
      resolve: {
        fact: ['$stateParams', 'facts', function($stateParams, facts) {
          return facts.get($stateParams.id);
        }]
      },
    })


    // FAMILIES

    // get all families
    .state('families', {
      url: '/back/families',
      templateUrl: '/families.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['families', function(families) {
          return families.getAll();
        }]
      },
    })

    // create a family
    .state('addFamily', {
      url: '/back/family-create',
      templateUrl: '/family-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

    // update a family
    .state('updateFamily', {
      url: '/families/:id',
      templateUrl: '/family.html',
      controller: 'familyCtrl',
      resolve: {
        family: ['$stateParams', 'families', function($stateParams, families) {
          return families.get($stateParams.id);
        }]
      },
    })

    // Directions

    // get all interregional directions
    .state('dirs', {
      url: '/back/dirs',
      templateUrl: '/dirs.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['dirs', function(dirs) {
          return dirs.getAll();
        }]
      },
    })

    // create a new interregional direction
    .state('addDir', {
      url: '/back/dir-create',
      templateUrl: '/dir-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

    // update an interregional direction
    .state('updateDir', {
      url: '/dir/:id',
      templateUrl: '/dir.html',
      controller: 'dirCtrl',
      resolve: {
        dir: ['$stateParams', 'dirs', function($stateParams, dirs) {
          return dirs.get($stateParams.id);
        }]
      },
    })

    // Prisons

    // get all prisons
    .state('prisons', {
      url: '/back/prisons',
      templateUrl: '/prisons.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['prisons', function(prisons) {
          return prisons.getAll();
        }]
      },
    })

    // create a new prison
    .state('addPrison', {
      url: '/back/prison-create',
      templateUrl: '/prison-create.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['dirs', 'families', function(dirs, families) {
          var postProm = [];
          postProm[0] = dirs.getAll();
          postProm[1] = families.getAll();
          return postProm;
        }]
      },
    })

    // update a prison
    .state('updatePrison', {
      url: '/prison/:id',
      templateUrl: '/prison.html',
      controller: 'prisonCtrl',
      resolve: {
        prison: function($stateParams, prisons){
          return prisons.get($stateParams.id);
        },
        dirs: function(dirs){
          return dirs.getAll();
        },
        families: function(families){
          return families.getAll();
        }
      },
    });

    $urlRouterProvider.otherwise('back');

  }
]);

// Main controller
app.controller('MainCtrl', [
  '$scope',
  'resources',
  'facts',
  'families',
  'dirs',
  'prisons',
  '$http',
  function($scope, resources, facts, families, dirs, prisons, $http) {
    $scope.resources = resources;
    $scope.facts = facts;
    $scope.families = families;
    $scope.dirs = dirs;
    $scope.years = [];
    $scope.populations = [];
    $scope.densities = [];
    $scope.prisons = prisons;

    // RESOURCES

    $scope.addResource = function() {
      resources.create({
        name: $scope.name,
        link: $scope.link,
      });
    };

    $scope.deleteResource = function(resource) {
      resources.delete(resource);
    };

    // FACTS

    $scope.deleteFact = function(fact) {
      facts.delete(fact);
    };

    $scope.addFact = function() {
      facts.create({
        date: $scope.date,
        name: $scope.name,
        description: $scope.description,
      });
    };

    // FAMILIES

    $scope.deleteFamily = function(family) {
      families.delete(family);
    };

    $scope.addFamily = function() {
      families.create({
        name: $scope.name,
        definition: $scope.definition,
      });
    };

    // Interregional directons

    $scope.addDir = function() {
      var years = document.querySelectorAll('fieldset .year');
      var populations = document.querySelectorAll('fieldset .population');
      var densities = document.querySelectorAll('fieldset .density');
      for (var i = 0; i < years.length; i++) {
        $scope.years[i] = years[i].value;
        $scope.populations[i] = populations[i].value;
        $scope.densities[i] = densities[i].value;
      }
      var sorted_years = $scope.years.slice(0).sort();
      var sorted_pop = [];
      var sorted_density = [];
      for(var i = 0; i < $scope.populations.length; i++ ){
        sorted_pop[i] = $scope.populations[$scope.years.indexOf(sorted_years[i])];
        sorted_density[i] = $scope.densities[$scope.years.indexOf(sorted_years[i])];
      }
      // new interregional direction
      dirs.create({
        name: $scope.name,
        coordinates: $scope.coordinates,
        population_by_year: {
          year: sorted_years,
          population: sorted_pop,
          density: sorted_density,
        },
        prisons: [],
      });
    };

    $scope.deleteDir = function(dir) {
      dirs.delete(dir);
    };

    $scope.addYear = function() {
      var button = document.querySelector('.submit');
      var fieldToAdd = document.createElement('fieldset');
      fieldToAdd.innerHTML = '<input type="number" class="population"></input><input type="number" class="year"></input> </input><input type="number" class="density"></input>';
      document.querySelector('form').insertBefore(fieldToAdd, button);
    };

    $scope.removeYear = function() {
      var fields = document.querySelectorAll('fieldset');
      fields[fields.length - 1].remove();
    };

    // Prisons

    $scope.addPrison = function() {
      return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.adress.replace(/\s+/g,"+")+"&key=AIzaSyCcQmrmCLvl8nFkOZWIwmj6SVrylAzvTm0")
      .success(function(data) {
        prisons.create({
          name: $scope.name,
          coordinates: {
            x: data.results[0].geometry.location.lat,
            y: data.results[0].geometry.location.lng
          },
          adress: $scope.adress,
          interregional_direction: $scope.dir,
          population: $scope.population,
          density: $scope.density,
          family: $scope.family
        });
      });
    };
    $scope.deletePrison = function(prison) {
      prisons.delete(prison);
    };
  }

]);

// Resource controller
app.controller('resourceCtrl', [
  '$scope',
  'resource',
  'resources',
  '$stateParams',
  function($scope, resource, resources, $stateParams) {
    $scope.resource = resource;
    $scope.updateResource = function(resource) {
      resources.update(resource, {
        id: resource._id,
        name: !$scope.name ? document.querySelector('.resource-name').getAttribute('value') : $scope.name,
        link: !$scope.link ? document.querySelector('.resource-link').getAttribute('value') : $scope.link,
      });
    };
  }
]);

// Countries controller
app.controller('countriesCtrl', [
  '$scope',
  'countries',
  function($scope, countries) {
    $scope.test = 'Hello world!';
    $scope.countries = countries;

    $scope.addCountry = function() {
      countries.create({
        code: $scope.code,
        name: $scope.name,
        rate: $scope.rate,
      });
    };

    $scope.deleteCountry = function(country) {
      countries.delete(country);
    };
  }
]);

// Countries controller
app.controller('countryCtrl', [
  '$scope',
  'country',
  'countries',
  '$stateParams',
  function($scope, country, countries, $stateParams) {
    $scope.country = country;
    $scope.updateCountry = function(country) {
      countries.update(country, {
        id: country._id,
        code: !$scope.code ? document.querySelector('.country-code').getAttribute('value') : $scope.code,
        name: !$scope.name ? document.querySelector('.country-name').getAttribute('value') : $scope.name,
        rate: !$scope.rate ? document.querySelector('.country-rate').getAttribute('value') : $scope.rate,
      });
    };
  }
]);

// Facts controller
app.controller('factCtrl', [
  '$scope',
  'fact',
  'facts',
  '$stateParams',
  function($scope, fact, facts, $stateParams) {
    $scope.fact = fact;
    $scope.updateFact = function(fact) {
      facts.update(fact, {
        id: fact._id,
        name: !$scope.name ? document.querySelector('.fact-name').getAttribute('value') : $scope.name,
        date: !$scope.date ? document.querySelector('.fact-date').getAttribute('value') : $scope.date,
        description: !$scope.description ? document.querySelector('.fact-description').getAttribute('value') : $scope.description,
      });
    };
  }
]);

// Families controller
app.controller('familyCtrl', [
  '$scope',
  'family',
  'families',
  '$stateParams',
  function($scope, family, families, $stateParams) {
    $scope.family = family;
    $scope.updateFamily = function(family) {
      families.update(family, {
        id: family._id,
        name: !$scope.name ? document.querySelector('.family-name').getAttribute('value') : $scope.name,
        definition: !$scope.definition ? document.querySelector('.family-definition').getAttribute('value') : $scope.definition,
      });
    };
  }
]);

// Interregional direction controller
app.controller('dirCtrl', [
  '$scope',
  'dir',
  'dirs',
  '$stateParams',
  function($scope, dir, dirs, $stateParams) {

    $scope.dir = dir;
    $scope.updateDir = function(dir) {
      var years = document.querySelectorAll('fieldset .year');
      var populations = document.querySelectorAll('fieldset .population');
      var densities = document.querySelectorAll('fieldset .density');
      for (var i = 0; i < years.length; i++) {
        $scope.years[i] = years[i].value;
        $scope.populations[i] = populations[i].value;
        $scope.densities[i] = densities[i].value;
      }
      var sorted_years = $scope.years.slice(0).sort();
      var sorted_pop = [];
      var sorted_density = [];
      for(var i = 0; i < $scope.populations.length; i++ ){
        sorted_pop[i] = $scope.populations[$scope.years.indexOf(sorted_years[i])];
        sorted_density[i] = $scope.densities[$scope.years.indexOf(sorted_years[i])];
      }

      dirs.update(dir, {
        id: dir._id,
        name: !$scope.name ? document.querySelector('.dir-name').getAttribute('value') : $scope.name,
        coordinates: !$scope.coordinates ? document.querySelector('.dir-coordinates').getAttribute('value') : $scope.coordinates,
        population_by_year: {
          year: sorted_years,
          population: sorted_pop,
          density: sorted_density,
        },
      });
    };
  }
]);

// Prisons controller
app.controller('prisonCtrl', [
  '$scope',
  'prison',
  'prisons',
  '$stateParams',
  '$http',
  function($scope, prison, prisons, $stateParams, $http) {
    $scope.prison = prison;
    $scope.dir = prison.interregional_direction;
    $scope.family = prison.family;
    $scope.adress = prison.adress;

    $scope.updatePrison = function(prison) {
      return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.adress.replace(/\s+/g,"+")+"&key=AIzaSyCcQmrmCLvl8nFkOZWIwmj6SVrylAzvTm0")
      .success(function(data) {
        prisons.update(prison,{
          id : prison._id,
          name: !$scope.name ? document.querySelector('.prison-name').getAttribute('value') : $scope.name,
          adress: !$scope.adress ? document.querySelector('.prison-adress').getAttribute('value') : $scope.adress,
          coordinates: {
            x: data.results[0].geometry.location.lat,
            y: data.results[0].geometry.location.lng
          },
          interregional_direction: !$scope.dir ? document.querySelector('.prison-dir').getAttribute('value'): $scope.dir,
          population: !$scope.population ? document.querySelector('.prison-population').getAttribute('value') : $scope.population,
          density: !$scope.density ? document.querySelector('.prison-density').getAttribute('value'): $scope.density,
          family: !$scope.family ? document.querySelector('.prison-family').getAttribute('value'): $scope.family,
        });
      });
    };
  }
]);


// Factories : define methods to create, delete, get, get all and update data

app.factory('facts', ['$http', function($http) {
  var o = {
    facts: [],
  };

  o.create = function(fact) {
    return $http.post('/facts', fact)
      .success(function(data) {
        o.facts.push(data);
        location.reload();
      });
  };

  o.delete = function(fact) {
    var url = '/facts/' + fact._id;
    return $http.delete(url)
      .success(function() {
        o.facts.splice(fact);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/facts/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/facts')
      .success(function(data) {
        angular.copy(data, o.facts);
      });
  };

  o.update = function(fact, data)  {
    var url = '/facts/' + fact._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };

  return o;
}]);

app.factory('resources', ['$http', function($http) {
  var o = {
    resources: [],
  };

  o.create = function(resource) {
    return $http.post('/resources', resource)
      .success(function(data) {
        o.resources.push(data);
        location.reload();
      });
  };

  o.delete = function(resource) {
    var url = '/resources/' + resource._id;
    return $http.delete(url)
      .success(function() {
        o.resources.splice(resource);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/resources/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/resources')
      .success(function(data) {
        angular.copy(data, o.resources);
      });
  };

  o.update = function(resource, data)  {
    var url = '/resources/' + resource._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };

  return o;
}]);

app.factory('countries', ['$http', function($http) {
  var o = {
    countries: [],
  };

  o.create = function(country) {
    return $http.post('/countries', country)
      .success(function(data) {
        o.countries.push(data);
        location.reload();
      });
  };

  o.delete = function(country) {
    var url = '/countries/' + country._id;
    return $http.delete(url)
      .success(function() {
        o.countries.splice(country);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/countries/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/countries')
      .success(function(data) {
        angular.copy(data, o.countries);
      });
  };

  o.update = function(country, data)  {
    var url = '/countries/' + country._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };



  return o;
}]);

app.factory('families', ['$http', function($http) {
  var o = {
    families: [],
  };

  o.create = function(family) {
    return $http.post('/families', family)
      .success(function(data) {
        o.families.push(data);
      });
  };

  o.delete = function(family) {
    var url = '/families/' + family._id;
    return $http.delete(url)
      .success(function() {
        o.families.splice(family);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/families/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/families')
      .success(function(data) {
        angular.copy(data, o.families);
      });
  };

  o.update = function(family, data)  {
    var url = '/families/' + family._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };

  return o;
}]);

app.factory('dirs', ['$http', function($http) {
  var o = {
    dirs: []
  };

  o.create = function(dir) {
    return $http.post('/dirs', dir)
      .success(function(data) {
        o.dirs.push(data);
      });
  };

  o.delete = function(dir) {
    var url = '/dirs/' + dir._id;
    return $http.delete(url)
      .success(function() {
        o.dirs.splice(dir);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/dirs/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/dirs')
      .success(function(data) {
        angular.copy(data, o.dirs);
      });
  };

  o.update = function(dir, data) {
    var url = '/dirs/' + dir._id;
    return $http.put(url, data)
      .success(function() {
        // location.reload();
      });
  };

  return o;
}]);

app.factory('prisons', ['$http', function($http) {
  var o = {
    prisons: []
  };

  o.create = function(prison) {
    return $http.post('/prisons', prison)
      .success(function(data) {
        o.prisons.push(data);
      })
      .success(function(data) {
        var toReturn = [];
        var dataDir = {
          id: data.interregional_direction,
          prison: data._id,
        };
        toReturn[0] = $http.put(/dirs/ + data.interregional_direction + /prisons/ , dataDir);
        var dataFamily = {
          id: data.family,
          prison: data._id,
        };
        toReturn[1] = $http.put(/families/ + data.family + /prisons/ , dataFamily);
        return toReturn;
      });
  };

  o.delete = function(prison) {
    var url = '/prisons/' + prison._id;
    return $http.delete(url)
      .success(function() {
        o.prisons.splice(prison);
        location.reload();
      });
  };

  o.get = function(id) {
    return $http.get('/prisons/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/prisons')
      .success(function(data) {
        angular.copy(data, o.prisons);
      });
  };

  o.update = function(prison, data) {
    var url = '/prisons/' + prison._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };

  return o;
}]);
