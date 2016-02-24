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
        }
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
      });

    $urlRouterProvider.otherwise('back');

}]);

app.controller('MainCtrl', [
  '$scope',
  'resources',
  function($scope, resources){
    $scope.test = 'Hello world!';
    $scope.resources = resources;

    $scope.addResource = function() {
      resources.create({
        name: $scope.name,
        link: $scope.link,
      });
    };

    $scope.deleteResource = function(resource) {
      resources.delete(resource);
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
