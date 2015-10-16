(function() {
    'use strict';

  angular
    .module('leapSuiteApp.speech')
    .factory('SpeechService', SpeechService);

    SpeechService.$inject = [];

    function SpeechService() {

      var service = {
          startRecognizer: startRecognizer
      };
      return service;

      function startRecognizer() {
        var recognition = new webkitSpeechRecognition();
        recognition.start();
        recognition.onresult = function(event) {
          console.log(event.results[0][0].transcript);
          return event.results[0][0].transcript;
        };
      };

    }
})();