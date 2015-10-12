(function() {
    'use strict';

  angular
    .module('leapSuiteApp.contacts')
    .controller('Contacts', Contacts);

    Contacts.$inject = [];

    function Contacts() {
      var vm = this;

      vm.cats = 'meow';
      alert('contact controller');

      activate();
      function activate() {
      }
    }
})();