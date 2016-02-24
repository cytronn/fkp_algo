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
          postPromise : ['resources', function(resources) {
            return resources.getAll();
          }]
        },
      })

      .state('updateResource', {
                  url: '/back/resources/:id',
                  templateUrl: '/resource.html',
                  controller: 'resourceCtrl',
                  resolve: {
                  resource : ['$stateParams', 'resources', function ($stateParams, resources) {
                      console.log(resources.get($stateParams.id));
                      return resources.get($stateParams.id);
              }]
          }
      })

      .state('countries', {
        url: '/back/countries',
        templateUrl: '/countries.html',
        controller: 'countriesCtrl',
        resolve: {
          countryPromise: ['countries', function(countries) {
            return countries.getAll();
          }]
        }
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
                  country : ['$stateParams', 'countries', function ($stateParams, countries) {
                      console.log(countries.get($stateParams.id));
                      return countries.get($stateParams.id);
              }]
          }
      })

      .state('facts',{
        url: '/back/facts',
        templateUrl:'/facts.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise : ['facts', function(facts) {
            return facts.getAll();
          }]
        },
      })

      .state('addFact',{
        url: '/back/fact-create',
        templateUrl:'/fact-create.html',
        controller : 'MainCtrl',
        resolve:{},
      })

      .state('updateFact', {
                  url: '/facts/:id',
                  templateUrl: '/fact.html',
                  controller: 'factCtrl',
                  resolve: {
                  fact : ['$stateParams', 'facts', function ($stateParams, facts) {
                      return facts.get($stateParams.id);
              }]
          },
      });

    $urlRouterProvider.otherwise('back');

}]);

app.controller('MainCtrl', [
  '$scope',
  'resources',
  'facts',
  function($scope, resources, facts){
    $scope.test = 'Hello world!';
    $scope.resources = resources;
    $scope.facts = facts;

    $scope.addResource = function() {
      resources.create({
        name: $scope.name,
        link: $scope.link,
      });
    };

    $scope.deleteResource = function(resource) {
      resources.delete(resource);
    };

    $scope.deleteFact = function(fact) {
      facts.delete(fact);
    };

    $scope.addFact = function() {
      facts.create({
        date : $scope.date,
        name : $scope.name,
        description : $scope.description,
      });
    };
  }
]);

app.controller('resourceCtrl', [
  '$scope',
  'resource',
  'resources',
  '$stateParams',
  function($scope, resource, resources, $stateParams){
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
  function($scope, countries){
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
  function($scope, country, countries, $stateParams){
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
  function($scope, fact, facts, $stateParams){
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
      .success(function(){
        o.facts.splice(fact);
        location.reload();
      });
  };

  o.get = function (id) {
    return $http.get('/facts/' + id)
      .then(function (res) {
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

  o.update = function(fact, data) {
    console.log(data.id);
    var url = '/facts/' + fact._id;
    return $http.put(url, data)
      .success(function(){
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
      .success(function(){
        o.resources.splice(resource);
        location.reload();
      });
  };

  o.get = function (id) {
    return $http.get('/resources/' + id)
      .then(function (res) {
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

  o.update = function(resource, data) {
    var url = '/resources/' + resource._id;
    return $http.put(url, data)
      .success(function(){
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
      .success(function(){
        o.countries.splice(country);
        location.reload();
      });
  };

  o.get = function (id) {
    return $http.get('/countries/' + id)
      .then(function (res) {
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

  o.update = function(country, data) {
    console.log(country);
    var url = '/countries/' + country._id;
    return $http.put(url, data)
      .success(function(){
        location.reload();
      });
  };

  return o;
}]);
