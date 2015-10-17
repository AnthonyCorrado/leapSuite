(function() {
    'use strict';

    angular
        .module('leapSuiteApp.directives')
        .directive('messengerContacts', messengerContacts);

    /* @ngInject */
    function messengerContacts () {
      
      var directive = {
        scope: {
          'contacts': '='
        },
        restrict: 'A',
        templateUrl: 'app/contacts/contacts.html'
      };
      return directive;
    }

})();