(function() {
    'use strict';

  angular
    .module('leapSuiteApp.lighting')
    .controller('Light', Light);

    Light.$inject = [];

    function Light() {
      var vm = this;

      activate();

      function activate() {
      }
    }
})();