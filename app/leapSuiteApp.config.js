(function() {
  'use strict';

  angular
  .module('leapSuiteApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'Dashboard',
        controllerAs: 'vm'
      })     

  });
})();