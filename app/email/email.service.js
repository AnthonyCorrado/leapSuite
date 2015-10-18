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
            "toName": request.toName,
            "toEmail": request.toEmail,
            "fromName": request.fromName,
            "fromEmail": request.fromEmail,
            "subject": message.subject,
            "payload": message.payload
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