angular.module('miapp')
  .controller('LandingController', function ListController($scope,User) {
	$scope.User = User;
  })