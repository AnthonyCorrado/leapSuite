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
        return 'this is a service ';
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