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
        resolve: {}
      });

    $urlRouterProvider.otherwise('back');

}]);

app.controller('MainCtrl', [
'$scope', 'resources',
function($scope, resources){
  $scope.test = 'Hello world!';

  $scope.addResource = function() {
    resources.create({
      name: $scope.name, 
      link: $scope.link,
    });
  };
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
  return o;
}]);