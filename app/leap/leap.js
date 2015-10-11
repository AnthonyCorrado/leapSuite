(function() {
    'use strict';

  angular
    .module('leapSuiteApp.leap')
    .controller('Leap', Leap);

    Leap.$inject = ['LightService'];

    function Leap(LightService) {
      var vm = this;

      vm.service = LightService.testLights();
      activate();

      function activate() {
      }
    }
})();