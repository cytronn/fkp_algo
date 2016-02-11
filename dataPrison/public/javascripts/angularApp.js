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
'$scope',
function($scope){
  $scope.test = 'Hello world!';
}]);
