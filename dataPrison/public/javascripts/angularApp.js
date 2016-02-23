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
      .state('resources', {
        url: '/back-resources',
        templateUrl: '/resources.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise : ['resources', function(resources) {
            return resources.getAll();
          }]
        }
      })

      .state('resourceModify', {
                  url: '/resources/:id',
                  templateUrl: '/resource.html',
                  controller: 'resourceCtrl',
                  resolve: {
                  resource : ['$stateParams', 'resources', function ($stateParams, resources) {
                      console.log(resources.get($stateParams.id));
                      return resources.get($stateParams.id);
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
  '$stateParams',
  function($scope, resource, $stateParams){
    $scope.resource = resource;
  }]);


app.factory('resources', ['$http', function($http) {
  var o = {
    resources: [],
  };

  o.create = function(resource) {
    return $http.post('/resources', resource)
      .success(function(data) {
        o.resources.push(data);
      });
  };

  o.delete = function(resource) {
    var url = '/resources/' + resource._id;
    return $http.delete(url)
      .success(function(){
        o.resources.splice(resource);
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

  return o;
}]);
