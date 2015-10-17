(function() {
  'use strict';

  angular
  .module('leapSuiteApp')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
      })
      .state('dashboard.contacts', {
        url: '/contacts',
        templateUrl: 'app/contacts/contacts.html',
        controller: 'Contacts',
        controllerAs: 'vm'
      })
      .state('dashboard.contacts.actions', {
        url: '/actions',
        views: {
          "action-bar": {
            templateUrl: "app/actions/actions.html",
            controller: 'Actions',
            controllerAs: 'vm'
          },
          "message-body": {
            templateUrl: "app/actions/message-body.html",
            controller: 'Actions',
            controllerAs: 'vm'
          }
        }
      })
      .state('dashboard.contacts.leap', {
        url: '/leap',
        templateUrl: 'app/leap/leap.html',
        controller: 'Leap',
        controllerAs: 'vm'
      })

  });
})();