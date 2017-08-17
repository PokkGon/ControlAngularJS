angular.module('miapp')
  .controller('ChatController', function ChatController($scope, $state, Messages) {
	$scope.username = $state.params.name;
	$scope.Messages = Messages;
  })