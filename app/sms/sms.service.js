(function() {
    'use strict';

  angular
    .module('leapSuiteApp.sms')
    .factory('SmsService', SmsService);

    SmsService.$inject = ['$http'];

    function SmsService($http) {

      var service = {
          createSms: createSms
      };
      return service;

      function createSms(request, message) {
        var req = {
          method: 'POST',
          url: 'http://localhost:3000/sendText',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "to": request.phoneNumber,
            "payload": message
          }
        }
        return $http(req)
          .then(getContactsComplete)
          .catch(getContactsFailed);

        function getContactsComplete(response) {
          return response;
        }

        function getContactsFailed(error) {
          console.log(error);
        }
      };

    }
})();