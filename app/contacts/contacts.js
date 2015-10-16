(function() {
    'use strict';

  angular
    .module('leapSuiteApp.contacts')
    .controller('Contacts', Contacts);

    Contacts.$inject = ['$scope', 'ContactsService', 'SmsService'];

    function Contacts($scope, ContactsService, SmsService) {
      var vm = this;
      vm.contacts = [];

      $scope.sendAction = function(contactObj, message) {
        console.log(contactObj);
        message = "hardcoded value";
        SmsService.createSms(contactObj, message);
      }
      
      activate();

      function activate() {
        return ContactsService.getAllContacts().then(function(response) {
          vm.contacts = response.data.contacts;
        })
      }
    }
})();