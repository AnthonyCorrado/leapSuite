(function() {
    'use strict';

  angular
    .module('leapSuiteApp.lighting')
    .factory('LightService', LightService);

    LightService.$inject = ['$http'];

    function LightService($http) {

      var service = {
          testLights: testLights,
          getAllLights: getAllLights
      };
      return service;

      function testLights() {
        return $http.get('http://localhost:3000/users')
          .then(getUsersComplete)
          .catch(getUsersFailed);

        function getUsersComplete(response) {
          return response;
        }

        function getUsersFailed(error) {
          console.log(error);
        }
      };

      function getAllLights() {
        var lights = $http.get(url);
        lights.then(function(response) {
          console.log(response);
        });
        return lights;
      };
    }
})();