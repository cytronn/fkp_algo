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
    .state('addResource', {
      url: '/back/create-resource',
      templateUrl: '/resource-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

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

    .state('addCountry', {
      url: '/back/create-country',
      templateUrl: '/country-create.html',
      controller: 'countriesCtrl',
      resolve: {},
    })

    .state('updateCountry', {
      url: '/back/countries/:id',
      templateUrl: '/country.html',
      controller: 'countryCtrl',
      resolve: {
        country: ['$stateParams', 'countries', function($stateParams, countries) {
          console.log(countries.get($stateParams.id));
          return countries.get($stateParams.id);
        }]
      },
    })

    // FACTS

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

    .state('addFact', {
      url: '/back/fact-create',
      templateUrl: '/fact-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

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

    .state('addFamily', {
      url: '/back/family-create',
      templateUrl: '/family-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

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

    .state('addDir', {
      url: '/back/dir-create',
      templateUrl: '/dir-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

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

    .state('addPrison', {
      url: '/back/prison-create',
      templateUrl: '/prison-create.html',
      controller: 'MainCtrl',
      resolve: {},
    })

    .state('updatePrison', {
      url: '/prison/:id',
      templateUrl: '/prison.html',
      controller: 'prisonCtrl',
      resolve: {
        prison: ['$stateParams', 'prisons', function($stateParams, prisons) {
          return prisons.get($stateParams.id);
        }]
      },
    });

    $urlRouterProvider.otherwise('back');

  }
]);

app.controller('MainCtrl', [
  '$scope',
  'resources',
  'facts',
  'families',
  'dirs',
  'prisons',
  function($scope, resources, facts, families, dirs, prisons) {
    $scope.test = 'Hello world!';
    $scope.resources = resources;
    $scope.facts = facts;
    $scope.families = families;
    $scope.dirs = dirs;
    $scope.years = [];
    $scope.populations = [];
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

    // dirs

    $scope.addDir = function() {
      var years = document.querySelectorAll('fieldset .year');
      var populations = document.querySelectorAll('fieldset .population');
      console.log(populations);
      for (var i = 0; i < years.length; i++) {
        $scope.years[i] = years[i].value;
        $scope.populations[i] = populations[i].value;
      }
      console.log($scope.populations);
      console.log($scope.years);
      var sorted_years = $scope.years.slice(0).sort();
      var sorted_pop = [];
      for(var i = 0; i < $scope.populations.length; i++ ){
        sorted_pop[i] = $scope.populations[$scope.years.indexOf(sorted_years[i])];
      }
      console.log(sorted_years);
      console.log(sorted_pop);
      dirs.create({
        name: $scope.name,
        coordinates: $scope.coordinates,
        population_by_year: {
          year: sorted_years,
          population: sorted_pop
        },
      });
    };

    $scope.deleteDir = function(dir) {
      dirs.delete(dir);
    };

    $scope.addYear = function() {
      var button = document.querySelector('.submit');
      var fieldToAdd = document.createElement('fieldset');
      fieldToAdd.innerHTML = '<input type="number" class="population"></input><input type="number" class="year"></input>';
      document.querySelector('form').insertBefore(fieldToAdd, button);
    };

    $scope.removeYear = function() {
      var fields = document.querySelectorAll('fieldset');
      fields[fields.length - 1].remove();
    };

    // Prisons

    $scope.addPrison = function() {
      prisons.create({
        name: $scope.name,

        coordinates: {
          x: $scope.x,
          y: $scope.y
        },
        interregional_direction: {
           type: $scope.dir
        },
        population: $scope.population,
        density: $scope.density,
        family: {
           type: $scope.family
        },

      });
    };

    $scope.deletePrison = function(prison) {
      prisons.delete(prison);
    };
  }

]);

app.controller('resourceCtrl', [
  '$scope',
  'resource',
  'resources',
  '$stateParams',
  function($scope, resource, resources, $stateParams) {
    $scope.resource = resource;
    $scope.updateResource = function(resource) {
      console.log(document.querySelector('.resource-name').getAttribute('value'));
      resources.update(resource, {
        id: resource._id,
        name: !$scope.name ? document.querySelector('.resource-name').getAttribute('value') : $scope.name,
        link: !$scope.link ? document.querySelector('.resource-link').getAttribute('value') : $scope.link,
      });
    };
  }
]);

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

app.controller('countryCtrl', [
  '$scope',
  'country',
  'countries',
  '$stateParams',
  function($scope, country, countries, $stateParams) {
    $scope.country = country;
    $scope.updateCountry = function(country) {
      console.log($scope.name);
      countries.update(country, {
        id: country._id,
        code: !$scope.code ? document.querySelector('.country-code').getAttribute('value') : $scope.code,
        name: !$scope.name ? document.querySelector('.country-name').getAttribute('value') : $scope.name,
        rate: !$scope.rate ? document.querySelector('.country-rate').getAttribute('value') : $scope.rate,
      });
    };
  }
]);

app.controller('factCtrl', [
  '$scope',
  'fact',
  'facts',
  '$stateParams',
  function($scope, fact, facts, $stateParams) {
    $scope.fact = fact;
    $scope.updateFact = function(fact) {
      console.log(document.querySelector('.fact-name').getAttribute('value'));
      facts.update(fact, {
        id: fact._id,
        name: !$scope.name ? document.querySelector('.fact-name').getAttribute('value') : $scope.name,
        date: !$scope.date ? document.querySelector('.fact-date').getAttribute('value') : $scope.date,
        description: !$scope.description ? document.querySelector('.fact-description').getAttribute('value') : $scope.description,
      });
    };
  }
]);

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
        name: !$scope.name ? document.querySelector('.fact-name').getAttribute('value') : $scope.name,
        definition: !$scope.definition ? document.querySelector('.family-description').getAttribute('value') : $scope.definition,
      });
    };
  }
]);

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
      console.log(populations);
      for (var i = 0; i < years.length; i++) {
        $scope.years[i] = years[i].value;
        $scope.populations[i] = populations[i].value;
      }

      var sorted_years = $scope.years.slice(0).sort();
      var sorted_pop = [];
      for(var i = 0; i < $scope.populations.length; i++ ){
        sorted_pop[i] = $scope.populations[$scope.years.indexOf(sorted_years[i])];
      }

      dirs.update(dir, {
        id: dir._id,
        name: !$scope.name ? document.querySelector('.dir-name').getAttribute('value') : $scope.name,
        coordinates: !$scope.coordinates ? document.querySelector('.dir-coordinates').getAttribute('value') : $scope.coordinates,
        population_by_year: {
          year: sorted_years,
          population: sorted_pop,
        },
      });
    };
  }
]);

app.controller('prisonCtrl', [
  '$scope',
  'prison',
  'prisons',
  '$stateParams',
  function($scope, prison, prisons, $stateParams) {

    $scope.prison = prison;
    $scope.updatePrison = function(prison) {
      dirs.update(dir, {
        id: dir._id,
        name: !$scope.name ? document.querySelector('.dir-name').getAttribute('value') : $scope.name,
        coordinates: !$scope.coordinates ? document.querySelector('.dir-coordinates').getAttribute('value') : $scope.coordinates,
        population_by_year: {
          year: sorted_years,
          population: sorted_pop,
        },
      });
    };
  }
]);


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
        console.log(res.data);
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/facts')
      .success(function(data) {
        angular.copy(data, o.facts);
        console.log(o);
      });
  };

  o.update = function(fact, data)  {
    console.log(data.id);
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
        console.log(res.data);
        return res.data;
      });
  };

  o.getAll = function() {
    return $http.get('/resources')
      .success(function(data) {
        angular.copy(data, o.resources);
        console.log(o);
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
        console.log(o);
      });
  };

  o.update = function(country, data)  {
    console.log(country);
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
        console.log('this');
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
        location.reload();
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
      });
  };

  o.delete = function(prison) {
    var url = '/prisons/' + prison._id;
    return $http.delete(url)
      .success(function() {
        console.log('this');
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
    var url = '/prisons/' + prisons._id;
    return $http.put(url, data)
      .success(function() {
        location.reload();
      });
  };

  return o;
}]);
