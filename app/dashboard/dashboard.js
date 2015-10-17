(function() {
  'use strict';

  angular
    .module('leapSuiteApp.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['ContactsService'];

  function Dashboard(ContactsService) {
    var vm = this;
    vm.contacts = [];
    vm.message = "you up to grab a drink for happy hour? If so, let's go grab two for ones"

    activate();

    function activate() {
      return ContactsService.getAllContacts().then(function(response) {
        vm.actions = ['TEXT', 'EMAIL', 'SLACK', 'OTHER'];
        vm.contacts = response.data.contacts;
      })
    }
  }
})();