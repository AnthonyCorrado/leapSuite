(function() {
    'use strict';

  angular
    .module('leapSuiteApp.contacts')
    .controller('Contacts', Contacts);

    Contacts.$inject = ['$scope', 'SmsService'];

    function Contacts($scope, SmsService) {
      var vm = this;
      vm.contacts = [];

      $scope.sendAction = function(contactObj, message) {
        console.log(contactObj);
        message = "hardcoded value";
        SmsService.createSms(contactObj, message);
      }
      
      activate();

      function activate() {
      }
    }
})();