(function() {
  'use strict';

  angular
  .module('leapSuiteApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('contacts', {
      url: '/contacts',
      templateUrl: 'app/contacts/contacts.html',
      controller: 'Contacts',
      controllerAs: 'vm'
    })

  });
})();