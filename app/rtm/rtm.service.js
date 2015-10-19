(function() {
    'use strict';

  angular
    .module('leapSuiteApp.rtm')
    .factory('RtmService', RtmService);

    RtmService.$inject = ['$http'];

    function RtmService($http) {

      var service = {
          createRtm: createRtm
      };
      return service;

      function createRtm(request, message) {
        var req = {
          method: 'POST',
          url: 'http://localhost:3000/sendRTM',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "to": request.slackId,
            "payload": message
          }
        }
        return $http(req)
          .then(rtmSendComplete)
          .catch(rtmSendFailed);

        function rtmSendComplete(response) {
          return response;
        }

        function rtmSendFailed(error) {
          console.log(error);
        }
      };

    }
})();