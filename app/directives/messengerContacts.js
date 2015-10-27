(function() {
    'use strict';

    angular
        .module('leapSuiteApp.directives')
        .directive('messengerContacts', messengerContacts);

    /* @ngInject */
    function messengerContacts () {
      
      var directive = {
        scope: {
          contacts: '=',
          selectContact: '&',
          rotationIndex: '='
        },
        link: function (scope, element, attrs) {
          // scope.rotationIndex
        },
        restrict: 'A',
        templateUrl: 'app/contacts/contacts.html'
      };
      return directive;
    }

})();