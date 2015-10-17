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
          selectAction: '&'
        },
        restrict: 'A',
        templateUrl: 'app/actions/actions.html'
      };
      return directive;
    }

})();