(function() {
  'use strict';

  angular
    .module('leapSuiteApp.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = [
    '$scope',
    'ContactsService',
    'SmsService',
    'EmailService',
    'RtmService'
  ];

  function Dashboard($scope, ContactsService, SmsService, EmailService, RtmService) {
    var vm = this;
    vm.isShown = false;
    vm.contacts = [];
    vm.message = "test";
    var currentUser = {};
    var currentAction = '';
    var currentContact = {};

    vm.sendMessage = function() {
      var readyMessage = {
        "action": currentAction,
        "contact": currentContact,
        "message": vm.message
      }
      var emailSendData = {
        "toName": currentContact.name,
        "toEmail": currentContact.email,
        "fromName": currentUser.name || "Anthony",
        "fromEmail": currentUser.email || "anthony@htmlfusion.com"
      }
      var emailContent = {
        "subject": "LeapSuite Message Received!",
        "payload": vm.message
      }

      if (currentAction === 'TEXT') {
        SmsService.createSms(currentContact, vm.message);
      } else if (currentAction === 'EMAIL') {
        EmailService.createEmail(emailSendData, emailContent);
      } else if (currentAction === 'SLACK') {
        RtmService.createRtm(currentContact, vm.message)
      }
      console.log('readyMessage', readyMessage);
      clearSelections();
    }

    vm.selectedAction = function(value) {
      currentAction = value;
    }
    vm.selectedContact = function(value) {
      currentContact = value;
    }
    vm.hasMessageBody = function(value) {
      vm.message = value;
    }

    vm.clearSelections = function() {
      vm.message = "";
      vm.clearAction();
      currentContact: null;
    }

    // will refactor into service
    vm.startSpeechRec = function() {
      var recognition = new webkitSpeechRecognition();
      recognition.start();
      recognition.onresult = function(event) {
        console.log(event.results[0][0].transcript);
        vm.message = event.results[0][0].transcript;
        $scope.$apply();
      };
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