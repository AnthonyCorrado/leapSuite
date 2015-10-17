(function() {
    'use strict';

  angular
    .module('leapSuiteApp.actions')
    .controller('Actions', Actions);

    Actions.$inject = ['$scope', 'SpeechService'];

    function Actions($scope, SpeechService) {
      var vm = this;

      activate();

      function activate() {
        SpeechService.startRecognizer();
      };

        // var recognition = new webkitSpeechRecognition();
        // recognition.continuous = true;
        // recognition.interimResults = true;

        // recognition.onstart = function() {
        //   alert('dfdfdas');
        // }
        // recognition.start();
        // recognition.onresult = function(event) {
        //   console.log(event);
        // }
    }
})();