(function() {
    'use strict';

  angular
    .module('leapSuiteApp.speech')
    .factory('SpeechService', SpeechService);

    SpeechService.$inject = ['$q', '$timeout'];

    function SpeechService($q, $timeout) {

      var service = {
          startRecognizer: startRecognizer
      };
      return service;

      function startRecognizer() {
        var deferred = $q.defer();
        var recognition = new webkitSpeechRecognition();
        recognition.start();
        recognition.onresult = function(event) {
          console.log(event.results[0][0].transcript);
          deferred.resolve(event.results[0][0].transcript);
        };
        return deferred.promise;
      };

    }
})();