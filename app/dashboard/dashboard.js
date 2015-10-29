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
    'LeapService',
    'SpeechService'
  ];

  function Dashboard($scope, $rootScope, ContactsService, SmsService, EmailService, RtmService, LeapService, SpeechService) {
    var vm = this;
    vm.isShown = false;
    vm.contacts = [];
    vm.isRecording = false;
    vm.primerCount = 0;
    var currentUser = {};
    var currentAction = '';

    function sendMessage() {
      console.log('message send action triggered!!');
      var readyMessage = {
        "action": $rootScope.actionItem,
        "contact": vm.contacts[$rootScope.rotationIndex],
        "message": vm.message
      };
      var emailSendData = {
        "toName": vm.contacts[$rootScope.rotationIndex].name,
        "toEmail": vm.contacts[$rootScope.rotationIndex].email,
        // "fromName": currentUser.name,
        // "fromEmail": currentUser.email
        "fromName": '',
        "fromEmail": ''
      };
      var emailContent = {
        "subject": "LeapSuite Message Received!",
        "payload": vm.message
      };

      if ($rootScope.actionItem === 0) {
        SmsService.createSms(vm.contacts[$rootScope.rotationIndex], vm.message);
      } else if ($rootScope.actionItem === 1) {
        EmailService.createEmail(emailSendData, emailContent);
      } else if ($rootScope.actionItem === 2) {
        RtmService.createRtm(vm.contacts[$rootScope.rotationIndex], vm.message)
      }
      console.log('readyMessage', readyMessage);
    };

    // test actions in place of motion gestures -----
    vm.selectedAction = function(value) {
      currentAction = value;
    };
    vm.selectedContact = function(value) {
      vm.contacts[$rootScope.rotationIndex] = value;
    };
    vm.hasMessageBody = function(value) {
      vm.message = value;
    };
    // -----------------

    $scope.$on('swipeDownTriggered', function(event, data) {
      vm.isRecording = true;
      $scope.$apply();
      startSpeechRec();
    });

    $scope.$on('sendMessageTriggered', function(event, data) {
      sendMessage();
    });

    $scope.$on('primerCountChanged', function(event, data) {
      console.log(data.primerCounter);
      vm.primerCount = data.primerCounter * 4;
      $scope.$apply();
    });

    function startSpeechRec() {
      SpeechService.startRecognizer().then(function(response) {
        vm.message = response; 
        vm.isRecording = false;
      });
    };

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