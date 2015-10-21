(function() {
  'use strict';

  angular
    .module('leapSuiteApp.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = [
    '$scope',
    '$rootScope',
    'ContactsService',
    'SmsService',
    'EmailService',
    'RtmService',
    'LeapService'
  ];

  function Dashboard($scope, $rootScope, ContactsService, SmsService, EmailService, RtmService, LeapService) {
    var vm = this;
    vm.isShown = false;
    vm.contacts = [];
    vm.message = "test";
    var currentUser = {};
    var currentAction = '';
    var currentContact = {};

    vm.sendMessage = function() {
      var readyMessage = {
        "action": $rootScope.actionItem,
        "contact": currentContact,
        "message": vm.message
      }
      var emailSendData = {
        "toName": currentContact.name,
        "toEmail": currentContact.email,
        "fromName": currentUser.name
        "fromEmail": currentUser.email
      }
      var emailContent = {
        "subject": "LeapSuite Message Received!",
        "payload": vm.message
      }

      if ($rootScope.actionItem === 0) {
        SmsService.createSms(currentContact, vm.message);
      } else if ($rootScope.actionItem === 1) {
        EmailService.createEmail(emailSendData, emailContent);
      } else if ($rootScope.actionItem === 2) {
        RtmService.createRtm(currentContact, vm.message)
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
      vm.message = value;
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
      LeapService.startLeapFrames();
      return ContactsService.getAllContacts().then(function(response) {
        vm.contacts = response.data.contacts;
      })
    }
  }
})();