(function() {
    'use strict';

  angular
    .module('leapSuiteApp.actions')
    .controller('Actions', Actions);

    Actions.$inject = ['ContactsService'];

    function Actions() {
      var vm = this;

      activate();

      function activate() {
      }
    }
})();