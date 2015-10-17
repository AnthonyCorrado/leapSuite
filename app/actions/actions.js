(function() {
    'use strict';

  angular
    .module('leapSuiteApp.actions')
    .controller('Actions', Actions);

    Actions.$inject = ['$scope', 'ContactsService', 'SpeechService'];

    function Actions($scope, ContactsService, SpeechService) {
      var vm = this;
      vm.mockVoice = "you up to grab a drink for happy hour? If so, let's go grab two for ones"

      activate();

      function activate() {
        vm.actionOptions = ['TEXT', 'EMAIL', 'SLACK', 'OTHER'];
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