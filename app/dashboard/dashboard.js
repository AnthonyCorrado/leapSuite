(function() {
  'use strict';

  angular
    .module('leapSuiteApp.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['ContactsService', 'SmsService', 'EmailService'];

  function Dashboard(ContactsService, SmsService, EmailService) {
    var vm = this;
    vm.isShown = false;
    vm.contacts = [];
    vm.message = "you up to grab a drink for happy hour? If so, let's go grab two for ones";
    var currentUser = {};
    var currentAction = '';
    var currentContact = {};
    var currentMessageBody = '';

    vm.sendMessage = function() {
      var readyMessage = {
        "action": currentAction,
        "contact": currentContact,
        "message": currentMessageBody
      }
      var emailSendData = {
        "toName": currentContact.name,
        "toEmail": currentContact.email,
        "fromName": currentUser.name || "Anthony",
        "fromEmail": currentUser.email || "anthony@htmlfusion.com"
      }
      var emailContent = {
        "subject": "LeapSuite Message Received!",
        "payload": currentMessageBody
      }

      if (currentAction === 'TEXT') {
        SmsService.createSms(currentContact, currentMessageBody);
      } else if (currentAction === 'EMAIL') {
        EmailService.createEmail(emailSendData, emailContent);
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