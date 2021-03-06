(function() {
    'use strict';

    angular
        .module('leapSuiteApp.directives')
        .directive('messengerMessage', messengerMessage);

    /* @ngInject */
    function messengerMessage () {
      
      var directive = {
        scope: {
          message: '=',
          messageBody: '&',
          isRecording: '=',
          primedStatus: '=',
          isPrimed: '='
        },
        restrict: 'A',
        templateUrl: 'app/message/message.html'
      };
      return directive;
    }

})();