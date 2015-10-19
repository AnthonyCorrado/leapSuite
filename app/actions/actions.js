(function() {
    'use strict';

  angular
    .module('leapSuiteApp.actions')
    .controller('Actions', Actions);

    Actions.$inject = [];

    function Actions() {
      var vm = this;

      activate();

      function activate() {
        SpeechService.startRecognizer();
      };
    }
})();