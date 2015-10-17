(function() {
    'use strict';

  angular
    .module('leapSuiteApp.email')
    .factory('EmailService', EmailService);

    EmailService.$inject = ['$http'];

    function EmailService($http) {

      var service = {
          createEmail: createEmail
      };
      return service;

      function createEmail(request, message) {
        var req = {
          method: 'POST',
          url: 'http://localhost:3000/sendEmail',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "to": request.phoneNumber,
            "payload": message
          }
        }
        return $http(req)
          .then(emailSendComplete)
          .catch(emailSendFailed);

        function emailSendComplete(response) {
          return response;
        }

        function emailSendFailed(error) {
          console.log(error);
        }
      };

    }
})();