(function() {
    'use strict';

  angular
    .module('leapSuiteApp.leap')
    .controller('Leap', Leap);

    Leap.$inject = ['ContactsService'];

    function Leap(ContactsService) {
      var vm = this;

      ContactsService.getAllContacts().then(function(response) {
        vm.service = response.data;
      });
      activate();

      function activate() {
      }
    }
})();