(function() {
    'use strict';

  angular
    .module('leapSuiteApp.actions')
    .controller('Actions', Actions);

    Actions.$inject = ['$rootScope'];

    function Actions($rootScope) {
      var vm = this;

      activate();

      function activate() {
        SpeechService.startRecognizer();
      };
    }
})();