(function() {
  'use strict';

  angular
    .module('leapSuiteApp.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['ContactsService'];

  function Dashboard(ContactsService) {
    var vm = this;
    vm.contacts = [];
    vm.message = "you up to grab a drink for happy hour? If so, let's go grab two for ones";
    var currentAction = '';
    var currentContact = {};
    var currentMessageBody = '';

    vm.sendMessage = function() {
      var readyMessage = {
        "action": currentAction,
        "contact": currentContact,
        "message": currentMessageBody
      }
      console.log('readyMessage', readyMessage);
    }

    vm.selectedAction = function(value) {
      currentAction = value;
    }
    vm.selectedContact = function(value) {
      currentContact = value;
    }
    vm.hasMessageBody = function(value) {
      currentMessageBody = value;
    }

    activate();

    function activate() {
      vm.actions = ['TEXT', 'EMAIL', 'SLACK', 'OTHER'];
      return ContactsService.getAllContacts().then(function(response) {
        vm.contacts = response.data.contacts;
      })
    }
  }
})();