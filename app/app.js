angular.module('miapp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('LandingUser', {
        url: '/',
        controller:'LandingController',
        templateUrl:'app/views/landing.html',
      })
      .state('ListChat', {
        url: '/chat/:name',
        controller:'ChatController',
        templateUrl:'app/views/chat.html',
      })
      .state('DetailTodo', {
        url: '/user/:id',
        controller:'DetailController',
        templateUrl:'app/views/detail.html',
      })

    $urlRouterProvider.otherwise('/')
})