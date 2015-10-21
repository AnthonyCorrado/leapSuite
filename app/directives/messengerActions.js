(function() {
    'use strict';

    angular
        .module('leapSuiteApp.directives')
        .directive('messengerActions', messengerActions);

    /* @ngInject */
    function messengerActions () {
      
      var directive = {
        scope: {
          actions: '=',
          selectAction: '&',
          actionItem: '='
        },
        link: function (scope, element, attrs) {
          scope.actionItem // contains the number
        },
        restrict: 'A',
        templateUrl: 'app/actions/actions.html'
      };
      return directive;
    }

})();