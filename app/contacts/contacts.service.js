(function() {
    'use strict';

  angular
    .module('leapSuiteApp.contacts')
    .factory('ContactsService', ContactsService);

    ContactsService.$inject = ['$http'];

    function ContactsService($http) {

      var service = {
          getAllContacts: getAllContacts
      };
      return service;

      function getAllContacts() {
        return $http.get('http://localhost:3000/users')
          .then(getContactsComplete)
          .catch(getContactsFailed);

        function getContactsComplete(response) {
          return response;
        }

        function getContactsFailed(error) {
          console.log(error);
        }
      };

    }
})();